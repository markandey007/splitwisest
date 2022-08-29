import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

const AmountInput = ({ label, text, value, onChange, disabled = false }) => {
  return (
    <FormControl
      flexDirection="row"
      display={label.length > 0 ? "flex" : "none"}
      justifyContent="space-between"
      mb="2"
    >
      <FormLabel>{label}</FormLabel>
      <HStack>
        <Input
          placeholder={text}
          size="sm"
          value={value}
          onChange={onChange}
          type="number"
          min="0"
          disabled={disabled}
        />
        <Box bgColor="gray.100" p="2">
          <Text>{text}</Text>
        </Box>
      </HStack>
    </FormControl>
  );
};

export default AmountInput;
