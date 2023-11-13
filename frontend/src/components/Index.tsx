import { FC } from "react";
import { Navigation } from "./navigation/Navigation";
import { DownloadButton } from "./downloadButton/DownloadButton";
import { Flex } from "@chakra-ui/react";

export const Index: FC = () => {
  return (
    <>
      <Navigation />

      <Flex>
        <DownloadButton url="download-csv">Download CSV</DownloadButton>
      </Flex>
    </>
  );
};
