import { Button } from "@chakra-ui/react";

const CustomButton = ({ type, onClick = () => {}, label }) => {
  return (
    <Button
      bgColor={type === "primary" ? "brand.600" : "danger.600"}
      _hover={{
        backgroundColor: type === "primary" ? "brand.800" : "danger.800",
      }}
      _active={{
        backgroundColor: type === "primary" ? "brand.800" : "danger.800",
      }}
      color="white"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
