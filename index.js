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

    // Get single users artworks by id for artworks details api
    app.get("/my-gallery/:id", async (req, res) => {
      const { id } = req.params;
      const result = await artworksCollection.findOne({
        _id: new ObjectId(id),
      });
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

    // Add Artworks getting data from user
    app.post("/add-artworks", async (req, res) => {
      const data = req.body;
      const result = await artworksCollection.insertOne(data);
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
