import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const RightSidebar = () => {
  return (
    <>
      <Flex
        width="20%"
        h="90vh"
        py="8"
        px="4"
        bgColor="#f5f3f2"
        direction="column"
        alignItems="flex-start"
        gap="4"
        overflowY="-moz-hidden-unscrollable"
      >
        <VStack>
          <Text fontSize="sm" fontWeight="semibold">
            SPLITWISEST ON THE GO
          </Text>
          <Text fontSize="xs" fontWeight="thin">
            Get the free Splitwise app and add IOUs from anywhere
          </Text>
        </VStack>
        <Image src="/images/applestore.png" h={14} alt="apple store" />
        <Image src="/images/androidstore.png" h={14} alt="android store" />
      </Flex>
    </>
  );
};

export default RightSidebar;
