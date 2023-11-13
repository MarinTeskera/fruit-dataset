import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Navigation: FC = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      w="100vw"
      mb="60px"
      p="10px 20px"
      shadow="base"
      bgColor="white"
    >
      <Heading as={Link} href="/" style={{ textDecoration: "none" }}>
        <Flex align="center" justify="center">
          <Text>Fruit data</Text>
        </Flex>
      </Heading>
      <Button as={Link} href="/database" colorScheme="teal">
        Database
      </Button>
    </Flex>
  );
};
