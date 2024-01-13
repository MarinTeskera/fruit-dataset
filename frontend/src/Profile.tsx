import { FC, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation } from "./components/navigation/Navigation";
import { Avatar, Flex } from "@chakra-ui/react";

export const Profile: FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/";
    }
  }, [isLoading, isAuthenticated]);

  return (
    <>
      <Navigation />
      {user && (
        <Flex direction="column" w="100vw" align="center">
          <Avatar name={user.name} src={user.picture} size="2xl" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </Flex>
      )}
    </>
  );
};
