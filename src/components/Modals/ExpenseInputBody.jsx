import {
  IconButton,
  Input,
  HStack,
  VStack,
  Text,
  Box,
  Tag,
  Button,
} from "@chakra-ui/react";
import { IconX, IconPlus, IconReceipt } from "@tabler/icons";
import dayjs from "dayjs";
import { useState } from "react";
import PaidByModal from "./PaidByModal";
import { nanoid } from "nanoid";
import SplitMethodModal from "./SplitMethodModal";
import CustomButton from "../Core/CustomButton";
import toast from "react-hot-toast";
import { saveExpenseToStorage } from "../../storage";
import { useRouter } from "next/router";

const ExpenseInputBody = ({ loggedInUser, onClose }) => {
  const router = useRouter();
  const [paidSplitMethod, setPaidSplitMethod] = useState({
    paidBy: loggedInUser.email,
    splitBy: "equally",
  });
  const [paidClicked, setPaidClicked] = useState(false);
  const [splitClicked, setSplitClicked] = useState(false);

  const handlePaidClicked = () => {
    setPaidClicked(true);
  };

  const handleSplitClicked = () => {
    setSplitClicked(true);
  };

  const [expense, setExpense] = useState({
    id: nanoid(),
    description: "",
    amount: 0,
    currency: "USD",
    date: new Date(),
    createdBy: loggedInUser.email,
    paidByMe: 0,
    splitByMe: 0,
    users: [{ email: "", paidAmount: 0, splitAmount: 0 }],
  });

  const { description, amount } = expense;

  const handleExpenseChange = (name) => (event) => {
    setExpense({ ...expense, [name]: event.target.value });
  };

  const saveExpense = (e) => {
    e.preventDefault();

    if (!description || (amount !== 0 && !amount)) {
      toast.error("Description or Amount cannot be empty!");
      return;
    }

    expense.amount = parseFloat(expense.amount);

    if (!paidClicked) expense.paidByMe = expense.amount;

    if (!splitClicked) {
      let splitAmount = parseFloat(expense.amount) / (1 + expense.users.length);
      expense.splitByMe = splitAmount;
      expense.users.forEach((user) => {
        user.splitAmount = splitAmount;
      });
    }

    expense["paidBy"] = paidSplitMethod.paidBy;
    expense["splitBy"] = paidSplitMethod.splitBy;

    setExpense({ ...expense });
    saveExpenseToStorage(expense, () => {
      toast.success("Expense saved!");
    });
    onClose();
    router.push("/");
  };

  const changePaidOrSplit = (type, value) => {
    if (type === "paid") {
      paidSplitMethod.paidBy = value;
    } else {
      paidSplitMethod.splitBy = value;
    }
    setPaidSplitMethod({ ...paidSplitMethod });
  };

  const handleAmountChange = (event, doneByMe, type, index) => {
    if (doneByMe) {
      if (type === "paid") {
        expense.paidByMe = event.target.value;
      } else {
        expense.splitByMe = event.target.value;
      }
    } else {
      if (type === "paid") {
        expense.users[index].paidAmount = event.target.value;
      } else {
        expense.users[index].splitAmount = event.target.value;
      }
    }
    setExpense({ ...expense });
  };

  const handleInputChange = (event, index) => {
    expense.users[index].email = event.target.value;
    setExpense({ ...expense });
  };

  const handleRemoveClick = (index) => {
    expense.users.splice(index, 1);
    setExpense({ ...expense });
  };

  const handleAddClick = () => {
    expense.users.push({ email: "", paidAmount: 0, splitAmount: 0 });
    setExpense({ ...expense });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  return (
    <>
      <HStack mb="8">
        <Text fontSize="sm" width="40%">
          With you and:
        </Text>
        <VStack>
          {expense.users.map((user, index) => (
            <HStack key={index}>
              <Input
                size="sm"
                variant="flushed"
                placeholder="Enter email or name"
                value={user.email}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              {expense.users.length > 1 && (
                <IconButton
                  colorScheme="red"
                  rounded="full"
                  size="xs"
                  icon={<IconX size={16} />}
                  onClick={() => handleRemoveClick(index)}
                />
              )}
              {expense.users.length - 1 === index && (
                <IconButton
                  colorScheme="green"
                  rounded="full"
                  size="xs"
                  icon={<IconPlus size={16} />}
                  onClick={handleAddClick}
                />
              )}
            </HStack>
          ))}
        </VStack>
      </HStack>

      {expense.users[0].email && (
        <VStack spacing={8}>
          <HStack spacing="8">
            <Box bgColor="gray.100" p="4">
              <IconReceipt size={64} color="gray" />
            </Box>
            <VStack>
              <Input
                size="md"
                variant="flushed"
                placeholder="Enter a description"
                value={description}
                onChange={handleExpenseChange("description")}
                isRequired
              />
              <HStack>
                <Text fontSize="xl">$</Text>
                <Input
                  size="md"
                  variant="flushed"
                  placeholder="0.00"
                  value={amount}
                  type="number"
                  onChange={handleExpenseChange("amount")}
                  isRequired
                />
              </HStack>
            </VStack>
          </HStack>

          <VStack fontSize="sm">
            <Text>
              Paid by{" "}
              <PaidByModal
                loggedInUser={loggedInUser}
                expense={expense}
                setExpense={setExpense}
                handleAmountChange={handleAmountChange}
                paidSplitMethod={paidSplitMethod}
                changePaidOrSplit={changePaidOrSplit}
                handlePaidClicked={handlePaidClicked}
              />{" "}
              and split{" "}
              <SplitMethodModal
                loggedInUser={loggedInUser}
                expense={expense}
                setExpense={setExpense}
                handleAmountChange={handleAmountChange}
                paidSplitMethod={paidSplitMethod}
                changePaidOrSplit={changePaidOrSplit}
                handleSplitClicked={handleSplitClicked}
              />
            </Text>
          </VStack>

          <HStack spacing={6}>
            <Tag
              size="md"
              borderRadius="full"
              variant="outline"
              cursor="pointer"
            >
              {dayjs(new Date()).format("MMMM DD, YYYY")}
            </Tag>
            <Tag
              size="md"
              borderRadius="full"
              variant="outline"
              cursor="pointer"
            >
              Add image/notes
            </Tag>
          </HStack>

          <HStack>
            <Button
              onClick={onClose}
              bgColor="gray.100"
              color="gray.800"
              variant="outline"
              mr="2"
            >
              Cancel
            </Button>
            <CustomButton type="primary" label="Save" onClick={saveExpense} />
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default ExpenseInputBody;
