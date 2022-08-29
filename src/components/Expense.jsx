import {
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IconTrash, IconListDetails } from "@tabler/icons";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { removeExpenseFromCart } from "../storage";
import TableDisplay from "./Core/TableDisplay";
import CustomModal from "./Modals/CustomModal";

const Expense = ({ expense, setExpenses }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteExpense = () => {
    if (
      confirm(
        "Expense will be deleted permanently. Are you sure you want to continue ?"
      )
    ) {
      setExpenses(removeExpenseFromCart(expense.id));
      toast.success("Expense deleted successfully");
    }
  };

  return (
    <>
      <VStack p="4" bgColor="gray.100" rounded="2xl" boxShadow="xl" gap="2">
        <Flex justifyContent="space-around" width="100%">
          <Text>{dayjs(expense.date).format("MMMM DD, YYYY")}</Text>
          <Text fontWeight="bold">{expense.description}</Text>
        </Flex>
        <Flex justifyContent="space-around" width="100%">
          <Text>Total: ${expense.amount}</Text>
          <Text>
            Paid by: <Text as="u">{expense.paidBy}</Text>
          </Text>
          <Text>
            Split: <Text as="u">{expense.splitBy}</Text>
          </Text>
        </Flex>
        <Flex justifyContent="center" width="100%" gap="4">
          <Button
            size="sm"
            colorScheme="green"
            rightIcon={<IconListDetails size={16} />}
            onClick={onOpen}
          >
            View all details
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            rightIcon={<IconTrash size={16} />}
            onClick={deleteExpense}
          >
            Delete
          </Button>
        </Flex>
      </VStack>

      <CustomModal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        title="Expense details"
      >
        <Flex direction="column" gap="4">
          <Text fontWeight="bold">Total expense: {expense.amount}</Text>
          <TableDisplay expense={expense} />
        </Flex>
      </CustomModal>
    </>
  );
};

export default Expense;
