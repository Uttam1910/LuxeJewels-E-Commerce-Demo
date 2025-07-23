// productController.js (Updated with Gemini)
const Product = require('../models/Product');
const axios = require('axios');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get all products (unchanged)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product (unchanged)
exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const allProducts = await Product.find({ _id: { $ne: req.params.id } });
    let recommendedProducts = [];
    let source = 'fallback';
    let stylingTips = [];
    let personalizedMessage = "";

    // Use Gemini if API key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Optimized prompt for recommendations
        const prompt = `
You are an expert jewelry stylist. Recommend exactly 4 complementary products from the list below that pair well with:

**Current Product**
Name: ${currentProduct.name}
Category: ${currentProduct.category}
Description: ${currentProduct.description}
Material: ${currentProduct.material || 'Not specified'}
Price: $${currentProduct.price}

**Available Products**
${allProducts.slice(0, 75).map(p => `- ${p._id}: ${p.name} (${p.category}) - $${p.price}`).join('\n')}

**Instructions**
1. Return ONLY 4 product IDs 
2. Format: comma-separated list (e.g., "id1,id2,id3,id4")
3. Do not include any explanations or additional text
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Extract IDs from response
        const idPattern = /[a-f0-9]{24}/gi;
        const recommendedIds = (text.match(idPattern) || []);
        
        // Fetch recommended products
        if (recommendedIds.length > 0) {
          recommendedProducts = await Product.find({ 
            _id: { $in: recommendedIds.slice(0, 4) } 
          });
          source = 'ai';
        }

        // Generate styling tips for the recommended products
        if (recommendedProducts.length > 0) {
          const stylingPrompt = `
As a professional jewelry stylist, provide:
1. A short personalized message (max 15 words) about how these items complement the ${currentProduct.name}
2. One styling tip (max 12 words) for each of these products:
${recommendedProducts.map(p => `- ${p._id}: ${p.name}`).join('\n')}

Format your response as:
Message: [your message here]
Tips:
- ${recommendedProducts[0]._id}: [tip 1]
- ${recommendedProducts[1]._id}: [tip 2]
...
          `;

          const stylingResult = await model.generateContent(stylingPrompt);
          const stylingResponse = await stylingResult.response;
          const stylingText = stylingResponse.text();
          
          // Parse styling message and tips
          const messageMatch = stylingText.match(/Message:\s*(.+)/i);
          personalizedMessage = messageMatch ? messageMatch[1] : "Perfect pairings for your style";
          
          // Extract styling tips
          recommendedProducts.forEach(product => {
            const tipRegex = new RegExp(`-\\s*${product._id}\\s*:\\s*(.+)`, 'i');
            const tipMatch = stylingText.match(tipRegex);
            stylingTips.push({
              productId: product._id,
              tip: tipMatch ? tipMatch[1] : `Pairs beautifully with your ${currentProduct.name}`
            });
          });
        }
      } catch (apiError) {
        console.log('Gemini API error:', apiError.message);
      }
    }

    // Fallback: Same category products
    if (recommendedProducts.length < 4) {
      const needed = 4 - recommendedProducts.length;
      const fallbackProducts = await Product.find({
        category: currentProduct.category,
        _id: { 
          $ne: req.params.id,
          $nin: recommendedProducts.map(p => p._id)
        }
      }).limit(needed);
      
      recommendedProducts = [...recommendedProducts, ...fallbackProducts];
      if (recommendedProducts.length) source = 'hybrid';
    }

    // Final fallback: Random products
    if (recommendedProducts.length < 4) {
      const randomNeeded = 4 - recommendedProducts.length;
      const randomProducts = await Product.aggregate([
        { $match: { 
          _id: { 
            $ne: new mongoose.Types.ObjectId(req.params.id),
            $nin: recommendedProducts.map(p => p._id)
          } 
        }},
        { $sample: { size: randomNeeded } }
      ]);
      recommendedProducts = [...recommendedProducts, ...randomProducts];
      source = 'random';
    }

    // Add default styling tips if not generated
    if (stylingTips.length === 0 && recommendedProducts.length > 0) {
      stylingTips = recommendedProducts.map(product => ({
        productId: product._id,
        tip: `Perfect match for your ${currentProduct.name}`
      }));
      personalizedMessage = "Beautiful complements for your selection";
    }

    res.json({ 
      products: recommendedProducts.slice(0, 4), 
      source,
      stylingTips,
      personalizedMessage
    });

  } catch (err) {
    console.error("Recommendation error:", err);
    
    // Emergency fallback
    const randomProducts = await Product.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(req.params.id) } } },
      { $sample: { size: 4 } }
    ]);
    
    res.json({ 
      products: randomProducts, 
      source: 'random',
      stylingTips: randomProducts.map(p => ({
        productId: p._id,
        tip: "Looks great with your selection"
      })),
      personalizedMessage: "You might also like these"
    });
  }
};