import * as artworkService from "../services/artworkService.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllArtworks = catchAsync(async (req, res) => {
  const result = await artworkService.findAllArtworks();
  res.send(result);
});

export const getLatestArtworks = catchAsync(async (req, res) => {
  const result = await artworkService.findLatestArtworks();
  res.send(result);
});

export const getArtworkById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await artworkService.findArtworkById(id);
  res.send({ success: true, result });
});

export const getMyGallery = catchAsync(async (req, res) => {
  const email = req.query.email;
  const result = await artworkService.findArtworksByEmail(email);
  res.send({ success: true, result });
});

export const getMyGalleryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await artworkService.findArtworkById(id);
  res.send({ success: true, result });
});

export const addArtwork = catchAsync(async (req, res) => {
  const newArtwork = req.body;
  const result = await artworkService.createArtwork(newArtwork);
  res.send({ success: true, result });
});

export const updateArtwork = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await artworkService.updateArtworkById(id, req.body);
  res.send({ success: true, result });
});

export const deleteArtwork = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await artworkService.deleteArtworkById(id);
  res.send({ success: true, result });
});
