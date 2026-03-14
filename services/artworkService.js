import { ObjectId } from "mongodb";
import { getArtworksCollection } from "../models/collections.js";

export const findAllArtworks = async () => {
  return await getArtworksCollection().find().toArray();
};

export const findLatestArtworks = async (limit = 6) => {
  return await getArtworksCollection()
    .find()
    .sort({ create_date: -1 })
    .limit(limit)
    .toArray();
};

export const findArtworkById = async (id) => {
  return await getArtworksCollection().findOne({
    _id: new ObjectId(id),
  });
};

export const findArtworksByEmail = async (email) => {
  return await getArtworksCollection()
    .find({ artist_email: email })
    .toArray();
};

export const createArtwork = async (artworkData) => {
  return await getArtworksCollection().insertOne(artworkData);
};

export const updateArtworkById = async (id, updateData) => {
  return await getArtworksCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
};

export const deleteArtworkById = async (id) => {
  return await getArtworksCollection().deleteOne({
    _id: new ObjectId(id),
  });
};
