import { Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";

const DisplayUserAvatar = ({ label, onClick, highlight }) => {
  return (
    <HStack
      display={label.length > 0 ? "flex" : "none"}
      p="3"
      cursor="pointer"
      onClick={onClick}
      bgColor={highlight ? "blue.100" : ""}
    >
      <Avatar
        size={"sm"}
        src={`https://avatars.dicebear.com/api/human/${label}.svg`}
        alt={label}
      />
      <Text>{label}</Text>
    </HStack>
  );
};

export default DisplayUserAvatar;
