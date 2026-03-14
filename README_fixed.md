# 🎨 ARTIFY Server - Backend API

**Live API:** [https://artify-server-eight.vercel.app/](https://artify-server-eight.vercel.app/)

Backend server for ARTIFY platform built with Node.js, Express, and MongoDB.

---

## ✨ Features

- User authentication with Firebase
- CRUD operations for artworks
- Like and favorite system
- Protected routes with JWT verification
- MongoDB database integration

---

## 🛠️ Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Firebase Admin** - Authentication

---

## 📦 Main Packages

```json
{
  "express": "^4.21.2",
  "mongodb": "^6.12.0",
  "firebase-admin": "^13.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7"
}
```

---

## 🚀 How to Run

1. **Clone the project**
   ```bash
   git clone https://github.com/savecodes/artify-server
   cd artify-server
   ```

2. **Install packages**
   ```bash
   npm install
   ```

3. **Add Environment Variables**
   
   Create `.env` file:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   FB_SERVICE_KEY=your_firebase_service_account_key
   ```

4. **Run the server**
   ```bash
   npm start
   ```
   
   For development:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server status check |
| GET | `/all-artworks` | Get all artworks |
| GET | `/latest-artworks` | Get 6 latest artworks |

### Protected Routes (Need Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/artwork/:id` | Get single artwork |
| GET | `/my-gallery?email=` | Get user's artworks |
| GET | `/my-gallery/:id` | Get single artwork details |
| GET | `/my-favorites?email=` | Get user's favorites |
| GET | `/favorites/check?email=&artwork_id=` | Check if favorited |
| POST | `/add-artworks` | Add new artwork |
| POST | `/favorites` | Add to favorites |
| PUT | `/my-gallery/edit/:id` | Update artwork |
| DELETE | `/my-gallery/:id` | Delete artwork |
| DELETE | `/favorites?email=&artwork_id=` | Remove from favorites |

---

## 🗄️ Database Collections

### artworks
- artwork_image, title, category
- medium_tools, description, dimensions
- price, visibility, likes_count
- artist_name, artist_email, user_avatar
- create_date

### favorites
- artwork_id
- likes_by (user email)

---

## 🔐 Authentication

All protected routes need Firebase token in header:
```
Authorization: Bearer <your_firebase_token>
```

---

## 📝 Example API Request

**Add Artwork:**
```javascript
POST /add-artworks
Headers: {
  Authorization: Bearer <token>
}
Body: {
  artwork_image: "url",
  title: "My Art",
  category: "Painting",
  artist_email: "user@email.com",
  // other fields...
}
```

---

## 🌐 Deployment

1. **Create vercel.json**
   ```json
   {
     "version": 2,
     "builds": [{ "src": "index.js", "use": "@vercel/node" }],
     "routes": [{ "src": "/(.*)", "dest": "index.js" }]
   }
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Add environment variables in Vercel dashboard**

---

## 📂 Project Structure

```
artify-server/
├── index.js        # Main server file
├── .env            # Environment variables
├── package.json
└── README.md
```

---

Made with ❤️ for Programming Hero Assignment
