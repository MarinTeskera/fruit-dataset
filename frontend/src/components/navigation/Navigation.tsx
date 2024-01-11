import { Avatar, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { LoginButton } from "../loginButton/LoginButton";
import { LogoutButton } from "../logoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export const Navigation: FC = () => {
  const { user, isAuthenticated } = useAuth0();

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
      <LoginButton />
      <LogoutButton />
      {isAuthenticated && user && (
        <Avatar name={user.name} src={user.picture} />
      )}
      <Button as={Link} href="/database" colorScheme="teal">
        Database
      </Button>
    </Flex>
  );
};
