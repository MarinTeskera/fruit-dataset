import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import { getCSV } from "./helpers/csv";
import { getJSON } from "./helpers/json";
import { generateCsvString } from "./helpers/generateCsvString";

//For env File
dotenv.config();
const db = require("../db");

const app: Application = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

const externalUrl = process.env.EXTERNAL_URL;
const port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: externalUrl }));

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

app.get("/download-csv", async (req, res) => {
  try {
    const data = await getCSV();

    const csvString = await generateCsvString(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=fruit_data.csv");

    res.send(csvString);
  } catch (error) {
    console.error("Error getting CSV:", error);
    res.status(500).send("Internal Server Error");
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
