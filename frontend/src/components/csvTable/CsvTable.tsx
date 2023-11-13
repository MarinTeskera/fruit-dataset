import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { ICsvData } from "../../interfaces/csv.interface";
import { Spinner } from "@chakra-ui/react";

export const CsvTable: FC<{ filter: string; category: string }> = ({
  filter,
  category,
  ...rest
}) => {
  const [data, setData] = useState<Array<ICsvData>>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:4200/csv?filter=${filter}&category=${category}`
        );

        console.log(
          `http://localhost:4200/csv?filter=${filter}&category=${category}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, category]);

  return (
    <>
      <TableContainer {...rest}>
        <Table variant="striped" size="sm">
          <TableCaption>Fruit data</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Color</Th>
              <Th>Type</Th>
              <Th>Description</Th>
              <Th>Country name</Th>
              <Th>Country code</Th>
              <Th>Nutritional value name</Th>
              <Th>Nutritional value percentage</Th>
              <Th>Currency</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          {isLoading ? (
            <Tbody>
              <Tr>
                <Td />
                <Td />
                <Td />
                <Td />
                <Td />
                <Td />
                <Td>
                  <Spinner size="xl" />
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {data.map((item) => (
                <Tr
                  _hover={{
                    background: "white",
                    color: "teal.500",
                  }}
                  key={Math.random()}
                >
                  <Td>{item.name}</Td>
                  <Td>{item.color}</Td>
                  <Td>{item.type}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.countryname}</Td>
                  <Td>{item.countrycode}</Td>
                  <Td>{item.nutritionalvaluename}</Td>
                  <Td>{item.nutritionalvaluepercentage}</Td>
                  <Td>{item.currency}</Td>
                  <Td>{item.price}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
