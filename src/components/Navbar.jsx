import Link from "next/link";
import {
  Flex,
  Avatar,
  HStack,
  useColorModeValue,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getLoggedInUser, logOutFromLocalStorage } from "../storage";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState({ email: "", name: "" });
  const router = useRouter();

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, []);

  const logoutUser = () => {
    logOutFromLocalStorage(() => {
      toast.success("You logged out successfully!");
      router.push("/login");
    });
  };

  return (
    <>
      <Flex
        bg={useColorModeValue("brand.600", "green.900")}
        h={10}
        width="100vw"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        left="0"
      >
        <Flex width="65vw" alignItems="center" justifyContent="space-between">
          <Link href="/">
            <HStack spacing={4} cursor="pointer">
              <Image src="/images/logo.png" as="img" h={5} alt="logo" />
              <Text color="white" fontWeight="bold" fontSize="lg">
                Splitwisest
              </Text>
            </HStack>
          </Link>
          <HStack spacing={4} cursor="pointer">
            <Avatar
              size={"xs"}
              src={`https://avatars.dicebear.com/api/male/${loggedInUser.email}.svg`}
              alt={loggedInUser.email}
            />
            <Text fontWeight="semibold" fontSize="md" color="white">
              {loggedInUser.name}
            </Text>
            <Button
              colorScheme="orange"
              size="sm"
              rounded="md"
              onClick={logoutUser}
            >
              Logout
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
