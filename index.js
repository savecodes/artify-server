import express from "express";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to Artify Server");
});

const run = async () => {
  try {
    await client.connect();

    const db = client.db("artifyDB");
    const artworksCollection = db.collection("artworks");
    const favoritesCollection = db.collection("favorites");

    // Get all artworks api
    app.get("/all-artworks", async (req, res) => {
      const result = await artworksCollection.find().toArray();
      res.send(result);
    });

    // Latest 6 Data Api
    app.get("/latest-artworks", async (req, res) => {
      const result = await artworksCollection
        .find()
        .sort({
          create_date: -1,
        })
        .limit(6)
        .toArray();

      res.send(result);
    });

    // Get single artworks by id for artworks details api
    app.get("/artwork/:id", async (req, res) => {
      const { id } = req.params;
      const result = await artworksCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send({ success: true, result });
    });

    // Get Users artworks by Email
    app.get("/my-gallery", async (req, res) => {
      const email = req.query.email;
      const result = await artworksCollection
        .find({
          artist_email: email,
        })
        .toArray();
      res.send({ success: true, result });
    });

    // Get single users artworks by id for artworks details api
    app.get("/my-gallery/:id", async (req, res) => {
      const { id } = req.params;
      const result = await artworksCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send({ success: true, result });
    });

    // Get Users artworks by Favorites
    app.get("/my-favorites", async (req, res) => {
      const email = req.query.email;

      const favorites = await favoritesCollection
        .find({ likes_by: email })
        .toArray();

      const artworkIds = favorites.map((item) => new ObjectId(item.artwork_id));

      const artworks = await artworksCollection
        .find({
          _id: { $in: artworkIds },
        })
        .toArray();

      res.send({ success: true, result: artworks });
    });

    // Check if artwork is in user's favorites
    app.get("/favorites/check", async (req, res) => {
      const { email, artwork_id } = req.query;

      if (!email || !artwork_id) {
        return res.send({ success: false, isFavorite: false });
      }

      const exists = await favoritesCollection.findOne({
        artwork_id: artwork_id,
        likes_by: email,
      });

      res.send({
        success: true,
        isFavorite: exists ? true : false,
      });
    });

    // Add Artworks API
    app.post("/add-artworks", async (req, res) => {
      const newArtwork = req.body;
      const result = await artworksCollection.insertOne(newArtwork);
      res.send({ success: true, result });
    });

    // Add Artworks getting data from user
    app.post("/favorites", async (req, res) => {
      const { artwork_id, likes_by } = req.body;

      const exists = await favoritesCollection.findOne({
        artwork_id,
        likes_by,
      });

      if (exists) {
        return res.send({ success: false, message: "Already in favorites" });
      }

      const result = await favoritesCollection.insertOne(req.body);
      res.send({ success: true, result });
    });

    // PUT single users artworks by id for artworks details update api
    app.put("/my-gallery/edit/:id", async (req, res) => {
      const { id } = req.params;
      const result = await artworksCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        { $set: req.body }
      );
      res.send({ success: true, result });
    });

    // Remove from favorites
    app.delete("/favorites", async (req, res) => {
      const { email, artwork_id } = req.query;

      const result = await favoritesCollection.deleteOne({
        likes_by: email,
        artwork_id: artwork_id,
      });

      if (result.deletedCount === 0) {
        return res.send({ success: false, message: "Not found" });
      }

      res.send({ success: true });
    });

    // Get single users artworks by id for artworks Delete api
    app.delete("/my-gallery/:id", async (req, res) => {
      const { id } = req.params;
      const result = await artworksCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send({ success: true, result });
    });

    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
};

run().catch(console.dir);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
