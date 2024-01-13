import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation } from "./components/navigation/Navigation";
import { Flex } from "@chakra-ui/react";

export const Profile: FC = () => {
  const { user } = useAuth0();

  return (
    <>
      <Navigation />
      {user && (
        <Flex direction="column" w="100vw" align="center">
          <img src={user.picture} alt="Profile" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </Flex>
      )}
    </>
  );
};
