const db = require("../../db");

export const getJSON = async () => {
  const query = `SELECT json_agg(json_build_object(
        'name', f.name,
        'color', f.color,
        'type', f.type,
        'description', f.description,
        'country', json_build_object('countryName', c.name, 'countryCode', c.code),
        'nutritionalValues', (
          SELECT json_agg(json_build_object('nutritionalValueName', nv.name, 'percentage', nv.percentage))
          FROM nutritionalValue AS nv
          WHERE nv.fruitId = f.id
        ),
        'prices', (
          SELECT json_agg(json_build_object('amount', p.amount, 'currency', p.currency))
          FROM price AS p
          WHERE p.fruitId = f.id
        )
      ))
      FROM fruit AS f
      JOIN country AS c ON f.countryId = c.id`;

  try {
    const result = await db.query(query);
    return result.rows[0].json_agg;
  } catch {
    throw new Error("Error getting JSON");
  }
};
