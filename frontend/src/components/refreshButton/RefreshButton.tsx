import { Button } from "@chakra-ui/react";
import { FC } from "react";

export const RefreshButton: FC = () => {
  const handleRefresh = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/refresh`
      );

      if (!response.ok) {
        throw new Error("Failed to refresh");
      }
    } catch (error) {
      console.error("Error refreshing:", error);
    }
  };

  return (
    <Button
      w="fit-content"
      mb="15px"
      colorScheme="teal"
      onClick={handleRefresh}
    >
      Refresh
    </Button>
  );
};
