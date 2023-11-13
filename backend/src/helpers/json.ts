const db = require("../../db");

export const getJSON = async (filter: string, category: string) => {
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

  const filteredColumn = validColumns[category] || null;

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
    return result.rows[0].json_agg.filter((row: any) => {
      if (filteredColumn) {
        if (category === "countryName") {
          return row.country.countryName
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
        if (category === "countryCode") {
          return row.country.countryCode
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
        if (category === "nutritionalValueName") {
          return row.nutritionalValues.some((nv: any) =>
            nv.nutritionalValueName.toLowerCase().includes(filter.toLowerCase())
          );
        }
        if (category === "currency") {
          return row.prices.some((p: any) =>
            p.currency.toLowerCase().includes(filter.toLowerCase())
          );
        } else {
          return row[category].toLowerCase().includes(filter.toLowerCase());
        }
      } else {
        return partialMatchObjectValues(row, filter);
      }
    });
  } catch {
    throw new Error("Error getting JSON");
  }
};

function partialMatchObjectValues(obj: any, targetSubstring: string) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        if (
          value.some((element) =>
            partialMatchObjectValues(element, targetSubstring)
          )
        ) {
          return true;
        }
      } else if (
        typeof value === "string" &&
        value.toLowerCase().includes(targetSubstring.toLowerCase())
      ) {
        return true;
      } else if (typeof value === "object" && value !== null) {
        if (partialMatchObjectValues(value, targetSubstring)) {
          return true;
        }
      }
    }
  }

  return false;
}
