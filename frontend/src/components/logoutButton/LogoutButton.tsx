import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export const LogoutButton: FC = () => {
  const { logout } = useAuth0();
  return (
    <Button
      w="fit-content"
      mb="15px"
      colorScheme="teal"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log out
    </Button>
  );
};
