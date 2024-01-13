import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Link } from "@chakra-ui/react";

export const LogoutButton: FC = () => {
  const { logout } = useAuth0();
  return (
    <Button
      as={Link}
      w="fit-content"
      colorScheme="teal"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log out
    </Button>
  );
};
