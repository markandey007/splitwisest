import { Button, Flex, Text } from "@chakra-ui/react";
import { IconRefresh } from "@tabler/icons";
import UserOweDisplay from "./Core/UserOweDisplay";

const OwedList = ({ owedAndOwesLists, loadAndSet }) => {
  return (
    <Flex width="100%" direction="column" overflowY="scroll">
      <Flex width="100%" justifyContent="space-around" bgColor="gray.50" p="4">
        <Text fontSize="lg" fontWeight="normal">
          YOU OWE
        </Text>
        <Button
          rightIcon={<IconRefresh size={16} />}
          size="sm"
          colorScheme="teal"
          variant="outline"
          onClick={loadAndSet}
        >
          Refresh
        </Button>
        <Text fontSize="lg" fontWeight="normal">
          YOU ARE OWED
        </Text>
      </Flex>
      <Flex width="100%">
        <UserOweDisplay owedAndOwesLists={owedAndOwesLists} type="iOwe" br />
        <UserOweDisplay owedAndOwesLists={owedAndOwesLists} type="theyOwe" />
      </Flex>
    </Flex>
  );
};

export default OwedList;
