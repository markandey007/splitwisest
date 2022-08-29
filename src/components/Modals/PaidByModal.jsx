import { Flex, Button, useDisclosure, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateManualAmounts } from "../../utils/validations";
import AmountInput from "../Core/AmountInput";
import CustomButton from "../Core/CustomButton";
import DisplayUserAvatar from "../Core/DisplayUserAvatar";
import CustomModal from "./CustomModal";

const PaidByModal = ({
  loggedInUser,
  expense,
  setExpense,
  handleAmountChange,
  paidSplitMethod,
  changePaidOrSplit,
  handlePaidClicked,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allUsersSameShare, setAllUsersSameShare] = useState(false);

  const selectOnePayer = (email) => {
    changePaidOrSplit("paid", email);

    if (loggedInUser.email === email) expense.paidByMe = expense.amount;
    else expense.paidByMe = 0;

    expense.users.forEach((user) => {
      if (user.email === email) user.paidAmount = expense.amount;
      else user.paidAmount = 0;
    });

    setExpense({ ...expense });
    handlePaidClicked();
    onClose();
  };

  const handlePayEqually = () => {
    setAllUsersSameShare(!allUsersSameShare);
    changePaidOrSplit("paid", "multiple");

    if (!allUsersSameShare) {
      let paidAmount = parseFloat(expense.amount) / (1 + expense.users.length);
      expense.paidByMe = paidAmount;
      expense.users.forEach((user) => {
        user.paidAmount = paidAmount;
      });
    }

    setExpense({ ...expense });
    handlePaidClicked();
  };

  const validateAmounts = () => {
    if (validateManualAmounts("paid", expense)) {
      toast.success("Changes saved successfully!");
      onClose();
    } else {
      toast.error("Total amount paid by users must be equal to expense!");
    }
  };

  return (
    <>
      <Button size="xs" variant="outline" colorScheme="teal" onClick={onOpen}>
        {paidSplitMethod.paidBy === loggedInUser.email
          ? "you"
          : paidSplitMethod.paidBy === "multiple"
          ? "multiple people"
          : paidSplitMethod.paidBy}
      </Button>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Choose payer">
        <>
          <DisplayUserAvatar
            label={loggedInUser.name}
            onClick={() => selectOnePayer(loggedInUser.email)}
            highlight={loggedInUser.email === paidSplitMethod.paidBy}
          />
          {expense.users.map((user, index) => (
            <DisplayUserAvatar
              label={user.email}
              onClick={() => selectOnePayer(user.email)}
              highlight={user.email === paidSplitMethod.paidBy}
              key={index}
            />
          ))}

          <Button
            onClick={() => {
              changePaidOrSplit("paid", "multiple");
              handlePaidClicked();
            }}
            disabled={paidSplitMethod.paidBy === "multiple"}
            mt="4"
          >
            Multiple people
          </Button>
          {paidSplitMethod.paidBy === "multiple" && (
            <Flex
              bgColor="gray.100"
              direction="column"
              alignItems="flex-start"
              p="2"
            >
              <Checkbox
                size="md"
                isChecked={allUsersSameShare}
                onChange={handlePayEqually}
                mb="4"
              >
                Each user paid for their own share
              </Checkbox>
              <AmountInput
                label={loggedInUser.name}
                text="$"
                value={expense.paidByMe}
                onChange={(e) => handleAmountChange(e, true, "paid", -1)}
                disabled={allUsersSameShare}
              />
              {expense.users.map((user, index) => (
                <AmountInput
                  key={index}
                  label={user.email}
                  text="$"
                  value={user.paidAmount}
                  onChange={(e) => handleAmountChange(e, false, "paid", index)}
                  disabled={allUsersSameShare}
                />
              ))}
              <CustomButton
                type="primary"
                label="Save changes"
                onClick={validateAmounts}
              />
            </Flex>
          )}
        </>
      </CustomModal>
    </>
  );
};

export default PaidByModal;
