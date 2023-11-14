import { Button, Flex, Input, Select } from "@chakra-ui/react";
import { FC, useState } from "react";
import { CsvTable } from "./components/csvTable/CsvTable";
import { DownloadButton } from "./components/downloadButton/DownloadButton";
import { Navigation } from "./components/navigation/Navigation";

export const Database: FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tableFilter, setTableFilter] = useState<string>("");
  const [tableCategory, setTableCategory] = useState<string>("");

  return (
    <>
      <Navigation />
      <Flex p="0px 20px 40px 20px" justify="space-between">
        <Flex>
          <Input
            placeholder="Search value"
            size="sm"
            w="200px"
            mr="20px"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Select
            placeholder="Search category"
            size="sm"
            mr="20px"
            w="200px"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="wildcard">Wildcard (any column)</option>
            <option value="name">Name</option>
            <option value="color">Color</option>
            <option value="type">Type</option>
            <option value="description">Description</option>
            <option value="countryName">Country name</option>
            <option value="countryCode">Country code</option>
            <option value="nutritionalValueName">Nutritional value name</option>
            <option value="currency">Currency</option>
          </Select>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => {
              setTableFilter(filter);
              setTableCategory(category);
            }}
          >
            Search
          </Button>
        </Flex>
        <Flex>
          <DownloadButton
            url="download-csv"
            fileName="fruit_data.csv"
            filter={tableFilter}
            category={tableCategory}
            size="sm"
            mr="20px"
          >
            Download CSV
          </DownloadButton>
          <DownloadButton
            url="download-json"
            fileName="fruit_data.json"
            filter={tableFilter}
            category={tableCategory}
            size="sm"
          >
            Download JSON
          </DownloadButton>
        </Flex>
      </Flex>
      <CsvTable filter={tableFilter} category={tableCategory} />
    </>
  );
};
