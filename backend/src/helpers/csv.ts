const db = require("../../db");

export const getCSV = async () => {
  const query = `
  SELECT f.name, f.color, f.type, f.description,
  c.name as countryName, c.code as countryCode,
  nv.name as nutritionalValueName, nv.percentage as nutritionalValuePercentage,
  p.amount as price, p.currency
FROM fruit AS f
JOIN country AS c ON f.countryId = c.id
LEFT JOIN nutritionalValue AS nv ON f.id = nv.fruitId
LEFT JOIN price AS p ON f.id = p.fruitId`;

  try {
    const result = await db.query(query);
    return result.rows;
  } catch {
    throw new Error("Error getting CSV");
  }
};
