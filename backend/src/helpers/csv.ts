const db = require("../../db");

export const getCSV = async (filter: string, column: string) => {
  // Define the columns that can be filtered
  const validColumns: any = {
    name: "f.name",
    color: "f.color",
    type: "f.type",
    description: "f.description",
    countryName: "c.name",
    countryCode: "c.code",
    nutritionalValueName: "nv.name",
    currency: "p.currency",
  };

  // Validate the provided filter column
  const filteredColumn = validColumns[column] || null;

  const query = `
    SELECT f.name, f.color, f.type, f.description,
      c.name as countryName, c.code as countryCode,
      nv.name as nutritionalValueName, nv.percentage as nutritionalValuePercentage,
      p.amount as price, p.currency
    FROM fruit AS f
    JOIN country AS c ON f.countryId = c.id
    LEFT JOIN nutritionalValue AS nv ON f.id = nv.fruitId
    LEFT JOIN price AS p ON f.id = p.fruitId
    WHERE
      ${
        filteredColumn
          ? `${filteredColumn} ILIKE $1`
          : `
        f.name ILIKE $1 OR
        f.color ILIKE $1 OR
        f.type ILIKE $1 OR
        f.description ILIKE $1 OR
        c.name ILIKE $1 OR
        c.code ILIKE $1 OR
        nv.name ILIKE $1 OR
        p.currency ILIKE $1
      `
      }
  `;

  try {
    const result = await db.query(query, [`%${filter}%`]);
    return result.rows;
  } catch (error) {
    console.error("Error getting CSV:", error);
    throw new Error("Error getting CSV");
  }
};
