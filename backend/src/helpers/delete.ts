const db = require("../../db");

export async function deleteFruit(fruitId: number) {
  try {
    let query = "DELETE FROM nutritionalValue WHERE fruitId = $1";
    await db.query(query, [fruitId]);
    query = "DELETE FROM price WHERE fruitId = $1";
    await db.query(query, [fruitId]);
    query = "DELETE FROM fruit WHERE id = $1";
    await db.query(query, [fruitId]);

    return;
  } catch (error) {
    console.error(error);
  }
}
