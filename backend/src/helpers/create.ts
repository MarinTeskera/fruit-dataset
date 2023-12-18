import { ICreateData } from "../interfaces/create.interface";

const db = require("../../db");

export async function createFruit(data: ICreateData) {
  try {
    let query = "SELECT id FROM country WHERE code = $1";

    const result = await db.query(query, [data.country.countryCode]);
    let countryId;

    if (result.rows[0]) {
      countryId = result.rows[0].id;
    } else {
      query = "INSERT INTO country (name, code) VALUES ($1, $2) RETURNING id";
      const r = await db.query(query, [
        data.country.countryName,
        data.country.countryCode,
      ]);
      countryId = r.rows[0].id;
    }

    query =
      "INSERT INTO fruit (name, color, type, description, countryId) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const fruitId = await db.query(query, [
      data.name,
      data.color,
      data.type,
      data.description,
      countryId,
    ]);

    for (const nv of data.nutritionalValues) {
      query =
        "INSERT INTO nutritionalValue (fruitId, name, percentage) VALUES ($1, $2, $3)";
      await db.query(query, [
        fruitId.rows[0].id,
        nv.nutritionalValueName,
        nv.percentage,
      ]);
    }

    for (const p of data.prices) {
      query =
        "INSERT INTO price (fruitId, amount, currency) VALUES ($1, $2, $3)";
      await db.query(query, [fruitId.rows[0].id, p.amount, p.currency]);
    }

    return;
  } catch (error) {
    console.error(error);
  }
}
