import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/todo.js";

dotenv.config();
const __dirname = path.resolve();
const app = express();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;
try {
  mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(`Mongoose connection error-> ${error}`);
}
app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(bodyParser.json());

app.post("/api/create", async (req, res) => {
  const record = req.body;
  //  console.log(record);

  // * CREATE (Creat)
  const response = await Todo.create(record);

  //  console.log(response);

  res.json({ status: "ok" });
});

app.post("/api/delete", async (req, res) => {
  const { record } = req.body;

  const response = await Todo.deleteOne({ record });

  //console.log(response, "/api/delete repsonse");

  res.json({ status: "ok" });
});

app.post("/api/modify", async (req, res) => {
  const { old: oldTitle, new: newTitle } = req.body;

  const response = await Todo.updateOne(
    {
      record: oldTitle,
    },
    {
      $set: {
        record: newTitle,
      },
    }
  );

  //console.log(response);

  res.json({ status: "ok" });
});

app.get("/api/get", async (req, res) => {
  const records = await Todo.find({});
  // console.log('Response => ', records)
  res.json(records);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on PORT ${PORT}`);
});
