import { Button } from "@chakra-ui/react";
import React from "react";

const ActionButton = ({ label, onClick = () => {} }) => {
  return (
    <Button size="sm" rounded="lg" bgColor="teal.50" onClick={onClick}>
      {label}
    </Button>
  );
};

export default ActionButton;
