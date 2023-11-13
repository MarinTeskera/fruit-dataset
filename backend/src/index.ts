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
  res.redirect(process.env.EXTERNAL_URL as string);
});

app.get("/csv", async (req, res) => {
  const filter = req.query.filter ? (req.query.filter as string) : "";
  const category = req.query.category ? (req.query.category as string) : "";

  try {
    const csv = await getCSV(filter, category);
    res.send(csv);
  } catch (err) {
    console.log(err);
  }
});

app.get("/download-csv", async (req, res) => {
  const filter = req.query.filter ? (req.query.filter as string) : "";
  const category = req.query.category ? (req.query.category as string) : "";

  try {
    const data = await getCSV(filter, category);

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
  const filter = req.query.filter ? (req.query.filter as string) : "";
  const category = req.query.category ? (req.query.category as string) : "";

  try {
    const csv = await getJSON(filter, category);
    res.send(csv);
  } catch (err) {
    console.log(err);
  }
});

app.get("/download-json", async (req, res) => {
  const filter = req.query.filter ? (req.query.filter as string) : "";
  const category = req.query.category ? (req.query.category as string) : "";

  try {
    const jsonData = await getJSON(filter, category);

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=fruit_data.json"
    );

    res.status(200).send(jsonData);
  } catch (error) {
    console.error("Error getting JSON:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server locally running at http://localhost:${port}`);
});
