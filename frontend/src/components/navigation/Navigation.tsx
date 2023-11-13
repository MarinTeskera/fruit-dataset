import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Navigation: FC = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      w="100vw"
      h="100px"
      mb="60px"
      p="0 10px"
      shadow="base"
      bgColor="white"
    >
      <Heading as={Link} href="/todo-lists" style={{ textDecoration: "none" }}>
        <Flex align="center" justify="center">
          <Text ml="12px">Fruit data</Text>
        </Flex>
      </Heading>
    </Flex>
  );
};
