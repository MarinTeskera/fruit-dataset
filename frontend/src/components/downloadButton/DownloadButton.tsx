import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export const DownloadButton: FC<{
  url: string;
  fileName: string;
  size?: string;
  mr?: string;
  filter?: string;
  category?: string;
  children: ReactNode;
}> = ({
  url,
  fileName,
  size = "md",
  mr = "0px",
  filter,
  category,
  children,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${url}?filter=${
          filter || ""
        }&category=${category || ""}`
      );

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }

      const blob = await response.blob();

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      w="fit-content"
      mb="15px"
      colorScheme="teal"
      size={size}
      mr={mr}
    >
      {children}
    </Button>
  );
};
