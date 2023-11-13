import { ICsvData } from "../interfaces/csv.interface";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

export const generateCsvString = async (data: Array<ICsvData>) => {
  const csvWriter = createCsvWriter({
    path: "temp.csv",
    header: [
      { id: "name", title: "Name" },
      { id: "color", title: "Color" },
      { id: "type", title: "Type" },
      { id: "description", title: "Description" },
      { id: "countryname", title: "CountryName" },
      { id: "countrycode", title: "CountryCode" },
      { id: "nutritionalvaluename", title: "NutritionalValueName" },
      {
        id: "nutritionalValuePercentage",
        title: "NutritionalValuePercentage",
      },
      { id: "price", title: "Price" },
      { id: "currency", title: "Currency" },
    ],
  });

  await csvWriter.writeRecords(data);

  return csvWriter.stringify();
};
