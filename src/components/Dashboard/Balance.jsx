import { VStack, Text, HStack } from "@chakra-ui/react";

const BalanceBox = ({ label, amount, danger = false, bl = false }) => {
  return (
    <VStack
      width="33.33%"
      border="1px"
      spacing={0}
      borderLeft={bl ? "1" : "0"}
      borderColor="gray.300"
    >
      <Text color="gray.500">{label}</Text>
      <Text color={danger ? "danger.600" : "brand.600"}>${amount}</Text>
    </VStack>
  );
};

const Balance = ({ owedAndOwesLists }) => {
  const calculateIOwe = () => {
    let amount = 0;

    if (!owedAndOwesLists.iOwe) return amount;

    owedAndOwesLists.iOwe.map((user) => {
      amount += user.amount;
    });
    return amount;
  };

  const calculateTheyOwe = () => {
    let amount = 0;

    if (!owedAndOwesLists.theyOwe) return amount;

    owedAndOwesLists.theyOwe.map((user) => {
      amount += user.amount;
    });
    return amount;
  };

  return (
    <HStack width="100%" spacing={0} bgColor="gray.100">
      <BalanceBox
        label="total balance"
        amount={calculateTheyOwe() - calculateIOwe()}
        bl={true}
        danger={calculateIOwe() > calculateTheyOwe()}
      />
      <BalanceBox label="you owe" amount={calculateIOwe()} danger={true} />
      <BalanceBox label="you are owed" amount={calculateTheyOwe()} />
    </HStack>
  );
};

export default Balance;
