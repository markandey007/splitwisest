import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const DisplayUser = ({ label, amount }) => {
  return (
    <Flex
      display={label.length > 0 ? "flex" : "none"}
      justifyContent="space-between"
      bgColor="gray.100"
      p="2"
      cursor="pointer"
    >
      <Text>{label}</Text>
      <Text>$ {amount}</Text>
    </Flex>
  );
};

export default DisplayUser;
