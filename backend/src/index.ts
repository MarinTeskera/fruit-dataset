import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import { getCSV } from "./helpers/csv";
import { getJSON } from "./helpers/json";
import { generateCsvString } from "./helpers/generateCsvString";
import apiRoute from "./api.route";
import fs from "fs";
import { IFruit } from "./interfaces/fruit.interface";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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
app.use("/api", apiRoute);

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
  const filter = req.query.filter ? (req.query.filter as string) : null;
  const category = req.query.category ? (req.query.category as string) : "";

  try {
    const filePath = path.join(__dirname, "data", "fruit_data.csv");

    let csvString;
    if (filter) {
      const data = await getCSV(filter, category);
      csvString = await generateCsvString(data);
    } else {
      csvString = fs.readFileSync(filePath, "utf8");
    }

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
  const filter = req.query.filter ? (req.query.filter as string) : null;
  const category = req.query.category ? (req.query.category as string) : "";

  try {
    const filePath = path.join(__dirname, "data", "fruit_data.json");

    let jsonData;
    if (filter) {
      jsonData = await getJSON(filter, category);
    } else {
      jsonData = fs.readFileSync(filePath, "utf8");
    }

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

app.get("/refresh", async (req, res) => {
  try {
    // Generate CSV and JSON strings
    const csvData = await getCSV("", "");
    const jsonData: Array<IFruit> = await getJSON("", "");

    console.log("jsonData", jsonData);

    // Save CSV and JSON strings to files
    const csvFilePath = path.join(__dirname, "data", "fruit_data.csv");
    const jsonFilePath = path.join(__dirname, "data", "fruit_data.json");

    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        // Specify the headers based on your object structure
        { id: "name", title: "name" },
        { id: "color", title: "color" },
        { id: "type", title: "type" },
        { id: "description", title: "description" },
        { id: "countryname", title: "countryname" },
        { id: "countrycode", title: "countrycode" },
        { id: "nutritionalvaluename", title: "nutritionalvaluename" },
        {
          id: "nutritionalvaluepercentage",
          title: "nutritionalvaluepercentage",
        },
        { id: "price", title: "price" },
        { id: "currency", title: "currency" },
      ],
    });

    const modifiedJsonData = jsonData.map(({ id, ...rest }) => rest);

    await csvWriter.writeRecords(csvData);
    fs.writeFileSync(jsonFilePath, JSON.stringify(modifiedJsonData));

    res.status(200).send("Data refreshed successfully");
  } catch (error) {
    console.error("Error refreshing data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server locally running at http://localhost:${port}`);
});
