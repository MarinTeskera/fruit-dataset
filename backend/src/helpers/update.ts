import { IUpdateData } from "../interfaces/update.interface";

const db = require("../../db");

export async function updateFruit(fruitId: number, data: IUpdateData) {
  try {
    let query = "UPDATE fruit SET";
    const values: any[] = [];

    if (data.name) {
      values.push(data.name);
      query += " name = $1,";
    }
    if (data.color) {
      values.push(data.color);
      query += " color = $" + values.length + ",";
    }
    if (data.type) {
      values.push(data.type);
      query += " type = $" + values.length + ",";
    }
    if (data.description) {
      values.push(data.description);
      query += " description = $" + values.length + ",";
    }

    if (data.country) {
      const countryQuery = "SELECT id FROM country WHERE code = $1";

      const result = await db.query(countryQuery, [data.country.countryCode]);
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

      values.push(countryId);
      query += " countryId = $" + values.length + ",";
    }

    query = query.slice(0, -1);

    values.push(fruitId);
    query += " WHERE id = $" + values.length;

    if (values.length > 1) {
      await db.query(query, values);
    }

    if (data.nutritionalValues) {
      await updateNutritionalValues(fruitId, data.nutritionalValues);
    }

    if (data.prices) {
      await updatePrices(fruitId, data.prices);
    }

    return;
  } catch (error) {
    console.error(error);
  }
}

async function updateNutritionalValues(
  fruitId: number,
  nutritionalValues: Array<{
    nutritionalValueName: string;
    percentage: number;
  }>
) {
  try {
    let query = "DELETE FROM nutritionalValue WHERE fruitId = $1";
    await db.query(query, [fruitId]);

    for (const nv of nutritionalValues) {
      query =
        "INSERT INTO nutritionalValue (fruitId, name, percentage) VALUES ($1, $2, $3)";
      await db.query(query, [fruitId, nv.nutritionalValueName, nv.percentage]);
    }

    return;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePrices(
  fruitId: number,
  prices: Array<{ amount: number; currency: string }>
) {
  try {
    let query = "DELETE FROM price WHERE fruitId = $1";
    await db.query(query, [fruitId]);

    for (const p of prices) {
      query =
        "INSERT INTO price (fruitId, amount, currency) VALUES ($1, $2, $3)";
      await db.query(query, [fruitId, p.amount, p.currency]);
    }

    return;
  } catch (error) {
    console.error(error);
  }
}
