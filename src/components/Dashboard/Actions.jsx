import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import CustomButton from "../Core/CustomButton";
import InputModal from "../Modals/InputModal";

const Actions = ({ title }) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      padding={4}
      bgColor="gray.100"
      direction={{ base: "column", md: "column", lg: "row" }}
    >
      <Text fontSize="3xl" fontWeight="bold">
        {title}
      </Text>
      <ButtonGroup>
        <InputModal />
        <CustomButton type="primary" label="Settle up" />
      </ButtonGroup>
    </Flex>
  );
};

export default Actions;
