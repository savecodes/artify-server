import * as favoriteService from "../services/favoriteService.js";
import catchAsync from "../utils/catchAsync.js";

export const getMyFavorites = catchAsync(async (req, res) => {
  const email = req.query.email;
  const result = await favoriteService.findUserFavorites(email);
  res.send({ success: true, result });
});

export const checkIfFavorite = catchAsync(async (req, res) => {
  const { email, artwork_id } = req.query;

  if (!email || !artwork_id) {
    return res.send({ success: false, isFavorite: false });
  }

  const exists = await favoriteService.checkIsFavorite(email, artwork_id);

  res.send({
    success: true,
    isFavorite: !!exists,
  });
});

export const addToFavorites = catchAsync(async (req, res) => {
  const { artwork_id, likes_by } = req.body;

  const exists = await favoriteService.checkIsFavorite(likes_by, artwork_id);

  if (exists) {
    return res.send({ success: false, message: "Already in favorites" });
  }

  const result = await favoriteService.addFavorite(req.body);
  res.send({ success: true, result });
});

export const removeFromFavorites = catchAsync(async (req, res) => {
  const { email, artwork_id } = req.query;

  const result = await favoriteService.removeFavorite(email, artwork_id);

  if (result.deletedCount === 0) {
    return res.send({ success: false, message: "Not found" });
  }

  res.send({ success: true });
});
