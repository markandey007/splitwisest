import { Avatar, Flex, Heading, Text, VStack } from "@chakra-ui/react";

const UserDisplay = ({ user, type }) => {
  return (
    <Flex
      p="2"
      cursor="pointer"
      bgColor="gray.100"
      width="95%"
      justifyContent="center"
      border="1px solid gray"
      rounded="md"
      boxShadow="lg"
    >
      <Avatar
        size={"md"}
        src={`https://avatars.dicebear.com/api/human/${user.email}.svg`}
        mr="2"
        alt={user.email}
      />
      <VStack>
        <Text>{user.email}</Text>
        <Text color={type === "iOwe" ? "danger.600" : "brand.600"}>
          {type === "iOwe"
            ? `you owe $${user.amount}`
            : `owes you $${user.amount}`}
        </Text>
      </VStack>
    </Flex>
  );
};

const UserOweDisplay = ({ owedAndOwesLists, type, br = false }) => {
  return (
    <Flex width="50%" direction="column" borderRight={br ? "1px" : "0"}>
      {type === "iOwe" ? (
        <VStack p="1" width="full">
          {owedAndOwesLists.iOwe && owedAndOwesLists.iOwe.length > 0 ? (
            <>
              {owedAndOwesLists.iOwe.map((user, i) => (
                <UserDisplay key={i} user={user} type={type} />
              ))}
            </>
          ) : (
            <Heading fontSize="lg" fontWeight="bold">
              You do not owe anyone
            </Heading>
          )}
        </VStack>
      ) : (
        <VStack p="1" width="full">
          {owedAndOwesLists.theyOwe && owedAndOwesLists.theyOwe.length > 0 ? (
            <>
              {owedAndOwesLists.theyOwe.map((user, i) => (
                <UserDisplay key={i} user={user} type={type} />
              ))}
            </>
          ) : (
            <Heading fontSize="lg" fontWeight="bold">
              No one owes you anything
            </Heading>
          )}
        </VStack>
      )}
    </Flex>
  );
};

export default UserOweDisplay;
