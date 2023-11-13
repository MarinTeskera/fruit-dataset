import { Parser } from "@json2csv/plainjs";
import { ICsvData } from "../interfaces/csv.interface";

export const generateCsvString = (data: Array<ICsvData>) => {
  const header = [
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
  ];

  const parser = new Parser();
  const csv = parser.parse(data);

  return csv;
};
