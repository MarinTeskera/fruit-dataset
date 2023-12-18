import { ICreateData } from "../interfaces/create.interface";

const db = require("../../db");

export async function createFruit(data: ICreateData) {
  const countryCheck = "SELECT id FROM country WHERE code = '$1'";
  const result = await db.query(countryCheck, data.country.countryCode);
  const countryId = result.rows[0];
}
