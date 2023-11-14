import { FC } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { DownloadButton } from "./components/downloadButton/DownloadButton";
import { Flex } from "@chakra-ui/react";

export const Home: FC = () => {
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
