import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export const DownloadButton: FC<{ url: string; children: ReactNode }> = ({
  url,
  children,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:4200/${url}`);

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }

      const blob = await response.blob();

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = "fruit_data.csv";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return <Button onClick={handleDownload}>{children}</Button>;
};
