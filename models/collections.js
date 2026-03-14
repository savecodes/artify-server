import { getCollection } from "../config/db.js";

export const getArtworksCollection = () => getCollection("artworks");
export const getFavoritesCollection = () => getCollection("favorites");
