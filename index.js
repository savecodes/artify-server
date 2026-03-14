import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import errorHandler from "./middlewares/error.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Artify Server");
});

// API Routes
app.use("/", artworkRoutes);
app.use("/", favoriteRoutes);

// Error Handling Middleware (must be after routes)
app.use(errorHandler);

// Connect to Database and Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Artify Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
