# LuxeJewels E-Commerce Demo 💎

![LuxeJewels Demo](https://images.unsplash.com/photo-1600721391689-2564bb8055de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

**A modern full-stack jewelry e-commerce platform with Google Gemini AI-powered recommendations. Designed for performance, elegance, and intelligent customer experiences.**

## 📌 Table of Contents
- [Features](#features-✨)
- [Technologies Used](#technologies-used-🛠️)
- [Demo](#demo-🌐)
- [Local Installation](#local-installation-🛠️)
- [Deployment](#deployment-🚀)
- [AI Implementation](#ai-implementation-🤖)
- [Project Structure](#project-structure-📁)
- [API Endpoints](#api-endpoints-🌐)
- [Contributing](#contributing-🤝)
- [License](#license-📄)

## Features ✨

- **Beautiful Product Catalog**
  - Categorized (Necklaces, Earrings, Bracelets, Rings)
  - High-quality product pages
  - Fully responsive design

- **AI-Powered Recommendations**
  - Integrated with Google Gemini AI
  - Context-aware suggestions
  - Fallback mechanism for reliability

- **Modern UX/UI**
  - Tailwind CSS styling
  - Smooth animations and transitions
  - Mobile-first navigation

- **Fullstack Architecture**
  - React.js frontend
  - Node.js/Express REST API backend
  - MongoDB with Mongoose

## Technologies Used 🛠️

| Category        | Technologies |
|-----------------|--------------|
| **Frontend**    | React.js, Tailwind CSS, React Router, React Icons, Axios |
| **Backend**     | Node.js, Express.js, MongoDB, Mongoose, Google Gemini API |
| **Deployment**  | Render (Backend), Vercel (Frontend), MongoDB Atlas |
| **Development** | Git, GitHub, npm, Dotenv, Nodemon |

## Demo 🌐

- 🔗 **Live Site:** [https://luxe-jewels-e-commerce-demo.vercel.app/](https://luxe-jewels-e-commerce-demo.vercel.app/)
- 🧪 **Backend API:** [https://dashboard.render.com/web/srv-d20epovdiees739etr80](https://dashboard.render.com/web/srv-d20epovdiees739etr80)
- 💻 **GitHub Repo:** [https://github.com/Uttam1910/LuxeJewels-E-Commerce-Demo](https://github.com/Uttam1910/LuxeJewels-E-Commerce-Demo)

## Local Installation 🛠️

```bash
# Clone repo
git clone https://github.com/Uttam1910/LuxeJewels-E-Commerce-Demo.git
cd LuxeJewels-E-Commerce-Demo

# Backend setup
cd backend
npm install
cp .env.example .env
# Add Mongo URI and Gemini key
npm start

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
# REACT_APP_API_URL=http://localhost:5000
npm start

# Seed database
cd ../backend && node seedDB.js
```

**Local URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment 🚀

### Backend → Render
```bash
# Create Web Service
# Connect GitHub repo
# Set Environment Variables:
MONGODB_URI=your_mongo
GEMINI_API_KEY=your_key
PORT=10000
# Build: npm install | Start: node server.js
```

### Frontend → Vercel
```bash
# Import GitHub repo to Vercel
REACT_APP_API_URL=https://luxejewels-backend.onrender.com
# Build: npm run build | Output: build
```

## AI Implementation 🤖

**Google Gemini Recommendation System:**
- Uses prompt engineering
- Returns 4 product IDs based on current product context
- Fallback: Category → Random

**Prompt Example:**
```text
As a jewelry expert, recommend 4 complementary products for:
'Diamond Solitaire Necklace' (Necklaces): 18K white gold with 0.5ct diamond.
Available products: [list of products with IDs]
Return comma-separated product IDs only.
```

**Recommendation Flow:**
```mermaid
graph LR
A[Current Product] --> B(Google Gemini AI)
B --> C{Recommendations}
C --> D[Product 1]
C --> E[Product 2]
C --> F[Product 3]
C --> G[Product 4]
```

## Project Structure 📁
```bash
luxe-jewels/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seedDB.js
├── frontend/
│   ├── src/components/
│   ├── src/pages/
│   └── App.js / index.js
└── README.md
```

## API Endpoints 🌐

| Endpoint | Method | Description |
|----------|--------|-------------|
| \/api/products\ | GET | Get all products |
| \/api/products/:id\ | GET | Get product by ID |
| \/api/products/:id/recommendations\ | GET | Get AI recommendations |
| \/api/health\ | GET | Health check |

## Contributing 🤝

1. Fork the repo
2. Create a branch: \git checkout -b feature/your-feature\" >> README.md
echo 
3.
Commit:
\git
commit
-m
Add feature
\"
