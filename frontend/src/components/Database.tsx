import { FC } from "react";
import { CsvTable } from "./csvTable/CsvTable";
import { Navigation } from "./navigation/Navigation";

export const Database: FC = () => {
  return (
    <>
      <Navigation />
      <CsvTable />
    </>
  );
};
