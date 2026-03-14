import { ObjectId } from "mongodb";
import { getArtworksCollection, getFavoritesCollection } from "../models/collections.js";

export const findUserFavorites = async (email) => {
  const favorites = await getFavoritesCollection()
    .find({ likes_by: email })
    .toArray();

  const artworkIds = favorites.map((item) => new ObjectId(item.artwork_id));

  return await getArtworksCollection()
    .find({
      _id: { $in: artworkIds },
    })
    .toArray();
};

export const checkIsFavorite = async (email, artwork_id) => {
  return await getFavoritesCollection().findOne({
    artwork_id: artwork_id,
    likes_by: email,
  });
};

export const addFavorite = async (favoriteData) => {
  return await getFavoritesCollection().insertOne(favoriteData);
};

export const removeFavorite = async (email, artwork_id) => {
  return await getFavoritesCollection().deleteOne({
    likes_by: email,
    artwork_id: artwork_id,
  });
};
