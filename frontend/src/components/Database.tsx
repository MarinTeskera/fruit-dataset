import { FC } from "react";
import { CsvTable } from "./csvTable/CsvTable";
import { Navigation } from "./navigation/Navigation";
import { Button, Flex, Input, Select } from "@chakra-ui/react";

export const Database: FC = () => {
  return (
    <>
      <Navigation />
      <Flex p="0px 20px 40px 20px">
        <Input placeholder="Search value" size="sm" w="200px" mr="20px" />
        <Select placeholder="Search category" size="sm" mr="20px" w="200px">
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
        <Button colorScheme="teal" size="sm">
          Search
        </Button>
      </Flex>
      <CsvTable />
    </>
  );
};
