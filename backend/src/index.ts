import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import { getCSV } from "./helpers/csv";
import { getJSON } from "./helpers/json";

//For env File
dotenv.config();
const db = require("../db");

const app: Application = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  const query = "SELECT * FROM fruit";
  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/csv", async (req, res) => {
  try {
    const csv = await getCSV();
    res.send(csv);
  } catch (err) {
    console.log(err);
  }
});

app.get("/json", async (req, res) => {
  try {
    const csv = await getJSON();
    res.send(csv);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server locally running at http://localhost:${port}`);
});
