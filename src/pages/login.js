import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { logInUserToLocalStorage } from "../storage";
import Head from "next/head";

export default function Login() {
  const name = useRef();
  const email = useRef();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    logInUserToLocalStorage(name.current.value, email.current.value, () => {
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <title>Login - Splitwisest</title>
      </Head>
      <main>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg="brand.600">
          <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} color="blue.600">
                Login to Splitwise 🚀
              </Heading>
              <Text fontSize={"lg"} color="white" fontWeight="bold">
                This is just to keep track of your expenses
              </Text>
            </Stack>
            <Box rounded={"lg"} bg="white" boxShadow={"xl"} p={8}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" autoComplete="off" ref={name} />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" autoComplete="off" ref={email} />
                  </FormControl>

                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </main>
    </>
  );
}
