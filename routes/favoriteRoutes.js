import express from "express";
import * as favoriteController from "../controllers/favoriteController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/my-favorites", verifyToken, favoriteController.getMyFavorites);
router.get("/favorites/check", verifyToken, favoriteController.checkIfFavorite);
router.post("/favorites", verifyToken, favoriteController.addToFavorites);
router.delete("/favorites", verifyToken, favoriteController.removeFromFavorites);

export default router;
