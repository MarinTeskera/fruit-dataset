import { Router } from "express";
import { getJSON } from "./helpers/json";
import { createFruit } from "./helpers/create";
import { ICreateData } from "./interfaces/create.interface";
import { IUpdateData } from "./interfaces/update.interface";
import { updateFruit } from "./helpers/update";
import { deleteFruit } from "./helpers/delete";
const db = require("../db");

const router = Router();

router.get("/fruits", async (req, res) => {
  try {
    const response = await getJSON("", "");
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - Dohvaćanje pojedinačnog resursa
router.get("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await getJSON(`${id}`, "id");
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

// GET - Dodatne krajnje točke
router.get("/fruits/color/:color", async (req, res) => {
  const { color } = req.params;
  try {
    const response = await getJSON(color, "color");
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - Dodatne krajnje točke
router.get("/fruits/countryCode/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  try {
    const response = await getJSON(countryCode, "countryCode");
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - Ubacivanje pojedinačnog resursa
router.post("/fruits", async (req, res) => {
  const data: ICreateData = req.body;
  try {
    await createFruit(data);
    res.status(201).json({ data: "Fruit created" });
  } catch (error) {
    console.log(error);
  }
});

// PUT - Osvježavanje elemenata resursa
router.put("/fruits/:id", async (req, res) => {
  const data: IUpdateData = req.body;
  const { id } = req.params;
  try {
    const fruitId = parseInt(id);
    await updateFruit(fruitId, data);
    res.json({ data: "fruit updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - Brisanje pojedinog resursa
router.delete("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fruitId = parseInt(id);
    await deleteFruit(fruitId);
    res.status(200).json({ data: "fruit deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
