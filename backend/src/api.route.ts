import { Router } from "express";
import { getJSON } from "./helpers/json";
import { createFruit } from "./helpers/create";
import { ICreateData } from "./interfaces/create.interface";
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
router.get("/fruits/type/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const response = await getJSON(type, "type");
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - Dodatne krajnje točke
router.get("/fruits/countryName/:countryName", async (req, res) => {
  const { countryName } = req.params;
  try {
    const response = await getJSON(countryName, "countryName");
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - Ubacivanje pojedinačnog resursa
router.post("/fruits", async (req, res) => {
  const exampleData: ICreateData = {
    name: "Apple",
    color: "Red",
    type: "Pome Fruit",
    description: "Crisp and sweet",
    country: {
      countryName: "United States",
      countryCode: "US",
    },
    nutritionalValues: [
      {
        nutritionalValueName: "Vitamin C",
        percentage: 95.5,
      },
      {
        nutritionalValueName: "Dietary Fiber",
        percentage: 3.7,
      },
    ],
    prices: [
      {
        amount: 0.99,
        currency: "USD",
      },
    ],
  };
  try {
    await createFruit(exampleData);
    res.status(201).json({ data: "" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - Osvježavanje elemenata resursa
router.put("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const { name, color, type, description } = req.body;
  try {
    const result = await db.query(
      "UPDATE fruit SET name = $1, color = $2, type = $3, description = $4 WHERE id = $5 RETURNING *",
      [name, color, type, description, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Resource not found" });
    } else {
      res.json({ data: result.rows[0] });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - Brisanje pojedinog resursa
router.delete("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM fruit WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Resource not found" });
    } else {
      res.json({
        data: result.rows[0],
        message: "Resource deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
