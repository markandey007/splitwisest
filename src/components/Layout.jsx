import { HStack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <title>{title}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <Flex width="100vw" justifyContent="center" mt={9}>
          <HStack width={{ base: "100vw", md: "90vw", lg: "65vw" }} spacing={0}>
            <LeftSidebar />
            {children}
            <RightSidebar />
          </HStack>
        </Flex>
      </main>
    </>
  );
};

export default Layout;
