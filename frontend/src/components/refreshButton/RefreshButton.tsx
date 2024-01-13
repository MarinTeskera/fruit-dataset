import { Button, Link } from "@chakra-ui/react";
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
      as={Link}
      w="fit-content"
      colorScheme="teal"
      onClick={handleRefresh}
    >
      Refresh
    </Button>
  );
};
