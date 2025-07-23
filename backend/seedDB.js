require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Validate environment variables first
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

const sampleProducts = [
  // Original products (6 items)
  {
    name: "Diamond Solitaire Necklace",
    description: "18K white gold necklace with 0.5ct brilliant-cut diamond",
    price: 1999.99,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1600721391689-2564bb8055de"
  },
  {
    name: "Sapphire Stud Earrings",
    description: "Platinum earrings with natural blue sapphires",
    price: 899.99,
    category: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    name: "Pearl Bracelet",
    description: "Freshwater pearls with sterling silver clasp",
    price: 450.00,
    category: "Bracelets",
    imageUrl: "https://images.unsplash.com/photo-1617119318460-43d7b5e4c0a1"
  },
  {
    name: "Emerald Cut Ring",
    description: "Art Deco inspired emerald cut diamond ring",
    price: 3200.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1611347158015-0bca12d9d87d"
  },
  {
    name: "Ruby Heart Pendant",
    description: "14K rose gold pendant with natural ruby heart",
    price: 750.00,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b"
  },
  {
    name: "Diamond Tennis Bracelet",
    description: "18K white gold bracelet with 1ct total diamonds",
    price: 2200.00,
    category: "Bracelets",
    imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
  },
  
  // Additional products (19 items)
  {
    name: "Gold Hoop Earrings",
    description: "14K yellow gold medium-sized hoops",
    price: 299.99,
    category: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1610992018870-9e3f81c93a08"
  },
  {
    name: "Infinity Silver Ring",
    description: "Sterling silver infinity symbol ring",
    price: 125.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1596703264256-11e2a0b3b5b5"
  },
  {
    name: "Diamond Halo Pendant",
    description: "18K white gold pendant with diamond halo",
    price: 950.00,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    name: "Pearl Drop Earrings",
    description: "Akoya pearl drops with diamond accents",
    price: 650.00,
    category: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1589782182703-2aaa99003698"
  },
  {
    name: "Gemstone Stacking Rings",
    description: "Set of 4 thin stacking rings with various gemstones",
    price: 350.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6"
  },
  {
    name: "Bold Statement Necklace",
    description: "Geometric brass necklace with enamel details",
    price: 180.00,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1600001873636-2d7e0d2a2e7b"
  },
  {
    name: "Men's Tungsten Ring",
    description: "Brushed tungsten carbide wedding band",
    price: 220.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a"
  },
  {
    name: "Sapphire Bangle Bracelet",
    description: "18K gold bangle with alternating sapphires",
    price: 2800.00,
    category: "Bracelets",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    name: "Chandelier Earrings",
    description: "Gold-plated chandelier earrings with crystals",
    price: 89.99,
    category: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1610992018870-9e3f81c93a08"
  },
  {
    name: "Moonstone Cocktail Ring",
    description: "Statement ring with rainbow moonstone center",
    price: 420.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a"
  },
  {
    name: "Layered Gold Chains",
    description: "Set of three 14K gold chains for layering",
    price: 850.00,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    name: "Diamond Eternity Band",
    description: "Platinum band with full circle of diamonds",
    price: 3500.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1596703264256-11e2a0b3b5b5"
  },
  {
    name: "Cuff Bracelet with Stones",
    description: "Silver cuff bracelet with turquoise inlays",
    price: 195.00,
    category: "Bracelets",
    imageUrl: "https://images.unsplash.com/photo-1617119318460-43d7b5e4c0a1"
  },
  {
    name: "Teardrop Emerald Necklace",
    description: "14K gold teardrop pendant with Colombian emerald",
    price: 1650.00,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b"
  },
  {
    name: "Huggie Hoop Earrings",
    description: "14K rose gold huggie hoops with diamond accents",
    price: 425.00,
    category: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1589782182703-2aaa99003698"
  },
  {
    name: "Dome Ring with Engraving",
    description: "Vintage-inspired dome ring with floral engraving",
    price: 275.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6"
  },
  {
    name: "Bar Necklace with Diamond",
    description: "Minimalist bar necklace with single diamond",
    price: 395.00,
    category: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1600001873636-2d7e0d2a2e7b"
  },
  {
    name: "Beaded Stretch Bracelet",
    description: "Semi-precious stone beaded stretch bracelet",
    price: 68.00,
    category: "Bracelets",
    imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
  },
  {
    name: "Gemstone Stud Earrings",
    description: "Set of 4 interchangeable gemstone studs",
    price: 150.00,
    category: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1589782182703-2aaa99003698"
  },
  {
    name: "Three-Stone Diamond Ring",
    description: "Classic three-stone ring with round diamonds",
    price: 2850.00,
    category: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1611347158015-0bca12d9d87d"
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB Connected Successfully');
    
    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} products`);
    
    // Verify insertion
    const count = await Product.countDocuments();
    console.log(`Database now has ${count} products`);
    
    process.exit(0);
  } catch (err) {
    console.error('SEEDING ERROR:', err);
    process.exit(1);
  }
};

seedDB();