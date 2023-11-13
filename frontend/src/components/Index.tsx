import { FC } from "react";
import { Navigation } from "./navigation/Navigation";
import { DownloadButton } from "./downloadButton/DownloadButton";
import { Flex } from "@chakra-ui/react";

export const Index: FC = () => {
  return (
    <>
      <Navigation />

      <Flex direction="column" w="100vw" align="center">
        <DownloadButton url="download-csv" fileName="fruit_data.csv">
          Download CSV
        </DownloadButton>
        <DownloadButton url="download-json" fileName="fruit_data.json">
          Download JSON
        </DownloadButton>
      </Flex>
    </>
  );
};
