import { Button, Link } from "@chakra-ui/react";
import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      as={Link}
      w="fit-content"
      colorScheme="teal"
      onClick={() => loginWithRedirect()}
    >
      Log in
    </Button>
  );
};
