import express from "express";
import * as artworkController from "../controllers/artworkController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all-artworks", artworkController.getAllArtworks);
router.get("/latest-artworks", artworkController.getLatestArtworks);
router.get("/artwork/:id", verifyToken, artworkController.getArtworkById);
router.get("/my-gallery", verifyToken, artworkController.getMyGallery);
router.get("/my-gallery/:id", verifyToken, artworkController.getMyGalleryById);
router.post("/add-artworks", verifyToken, artworkController.addArtwork);
router.put("/my-gallery/edit/:id", verifyToken, artworkController.updateArtwork);
router.delete("/my-gallery/:id", verifyToken, artworkController.deleteArtwork);

export default router;
