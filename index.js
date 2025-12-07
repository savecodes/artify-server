import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
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
    const artworksCCollection = db.collection("artworks");

    // Get all artworks api
    app.get("/all-artworks", async (req, res) => {
      const result = await artworksCCollection.find().toArray();
      res.send(result);
    });

    // Latest 6 Data Api
    app.get("/latest-artworks", async (req, res) => {
      const result = await artworksCCollection
        .find()
        .sort({
          create_date: -1,
        })
        .limit(6)
        .toArray();

      res.send(result);
    });

    // Add Artworks getting data from user
    app.post("/add-artworks", async (req, res) => {
      const data = req.body;
      const result = await artworksCCollection.insertOne(data);
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
