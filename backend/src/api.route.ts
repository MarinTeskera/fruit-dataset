import { Router } from "express";
import { getJSON, getJSONWithLD } from "./helpers/json";
import { createFruit } from "./helpers/create";
import { ICreateData } from "./interfaces/create.interface";
import { IUpdateData } from "./interfaces/update.interface";
import { updateFruit } from "./helpers/update";
import { deleteFruit } from "./helpers/delete";

const db = require("../db");
const router = Router();

router.get("/fruits", async (req, res) => {
  try {
    const response = await getJSONWithLD("", "");
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getJSONWithLD(`${id}`, "id");
    if (!response.length) {
      res.status(404).json({ error: "Fruit not found" });
    } else {
      res.status(200).json({ data: response[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fruits/color/:color", async (req, res) => {
  const { color } = req.params;
  try {
    const response = await getJSONWithLD(color, "color");
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fruits/countryCode/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  try {
    const response = await getJSONWithLD(countryCode, "countryCode");
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fruits/currency/:currency", async (req, res) => {
  const { currency } = req.params;
  try {
    const response = await getJSONWithLD(currency, "currency");
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/fruits", async (req, res) => {
  const data: ICreateData = req.body;
  try {
    await createFruit(data);
    res.status(201).json({ data: "Fruit created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/fruits/:id", async (req, res) => {
  const data: IUpdateData = req.body;
  const { id } = req.params;
  try {
    const fruitId = parseInt(id);
    await updateFruit(fruitId, data);
    res.status(200).json({ data: "Fruit updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fruitId = parseInt(id);
    await deleteFruit(fruitId);
    res.status(200).json({ data: "Fruit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle non-existent API endpoints
router.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default router;
