import {
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Flex,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomModal from "./CustomModal";
import toast from "react-hot-toast";
import { validateManualAmounts } from "../../utils/validations";
import AmountInput from "../Core/AmountInput";
import ActionButton from "../Core/ActionButton";
import CustomButton from "../Core/CustomButton";
import DisplayUser from "../Core/DisplayUser";

const SplitMethodModal = ({
  loggedInUser,
  expense,
  setExpense,
  handleAmountChange,
  paidSplitMethod,
  changePaidOrSplit,
  handleSplitClicked,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [percentAmount, setPercentAmount] = useState({});
  const [showTabs, setShowTabs] = useState(true);
  const [allUsersSameShare, setAllUsersSameShare] = useState(false);

  const handleFullOwe = (whoOwes) => {
    if (whoOwes === "you") {
      expense.users[0].splitAmount = expense.amount;
      expense.splitByMe = 0;
    } else {
      expense.users[0].splitAmount = 0;
      expense.splitByMe = expense.amount;
    }

    setExpense({ ...expense });
    changePaidOrSplit(
      "split",
      whoOwes === "you" ? expense.users[0].email : loggedInUser.email
    );
    setShowTabs(false);
    handleSplitClicked();
    onClose();
  };

  const handleSplitEqually = () => {
    setAllUsersSameShare(!allUsersSameShare);
    changePaidOrSplit("split", "equally");

    if (!allUsersSameShare) {
      let splitAmount = parseFloat(expense.amount) / (1 + expense.users.length);
      expense.splitByMe = splitAmount;
      expense.users.forEach((user) => {
        user.splitAmount = splitAmount;
      });
    }

    setExpense({ ...expense });
    handleSplitClicked();
  };

  const validateAmounts = () => {
    if (validateManualAmounts("split", expense)) {
      toast.success("Changes saved successfully!");
      changePaidOrSplit("split", "unequally");
      handleSplitClicked();
      onClose();
    } else {
      toast.error("Total amount must be equal to expense!");
    }
  };

  const splitByPercent = () => {
    percentAmount[loggedInUser.email] = 0;
    expense.users.forEach((user) => {
      percentAmount[user.email] = 0;
    });

    setPercentAmount({ ...percentAmount });
    changePaidOrSplit("split", "unequally");
  };

  const handlePercentChange = (event, email) => {
    setPercentAmount({ ...percentAmount, [email]: event.target.value });
  };

  const validatePercents = () => {
    let totalPercent = 0.0;
    for (let key in percentAmount) {
      if (key.length > 0) totalPercent += parseFloat(percentAmount[key]);
    }

    if (parseFloat(totalPercent) === parseFloat(100)) {
      expense.splitByMe =
        (expense.amount * percentAmount[loggedInUser.email]) / 100;

      expense.users.forEach((user) => {
        user.splitAmount = (expense.amount * percentAmount[user.email]) / 100;
      });
      setExpense({ ...expense });

      toast.success("Changes saved successfully!");
      changePaidOrSplit("split", "unequally");
      handleSplitClicked();
      onClose();
    } else {
      toast.error("Total percentage must be 100!");
    }
  };

  return (
    <>
      <Button size="xs" variant="outline" colorScheme="teal" onClick={onOpen}>
        {paidSplitMethod.splitBy}
      </Button>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Choose split options"
      >
        <>
          {expense.users.length == 1 && (
            <Flex flexDirection="column" gap="2" mb="4">
              <ActionButton
                label="Split the expense"
                onClick={() => {
                  setShowTabs(true);
                }}
              />
              <ActionButton
                label="You owe the full amount"
                onClick={() => handleFullOwe("you")}
              />
              <ActionButton
                label=" They owe the full amount"
                onClick={() => handleFullOwe("they")}
              />
            </Flex>
          )}

          {showTabs && (
            <Tabs variant="enclosed-colored" isManual>
              <TabList>
                <Tooltip label="Split equally">
                  <Tab>=</Tab>
                </Tooltip>
                <Tooltip label="Split by exact amounts">
                  <Tab>1.23</Tab>
                </Tooltip>
                <Tooltip label="Split by percentages">
                  <Tab onClick={splitByPercent}>%</Tab>
                </Tooltip>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex direction="column">
                    <Checkbox
                      size="md"
                      isChecked={allUsersSameShare}
                      onChange={handleSplitEqually}
                      mb="4"
                    >
                      Split equally
                    </Checkbox>
                    <Flex direction="column" gap="2">
                      <DisplayUser
                        label={loggedInUser.name}
                        amount={expense.splitByMe}
                      />
                      {expense.users.map((user, index) => (
                        <DisplayUser
                          label={user.email}
                          amount={user.splitAmount}
                          key={index}
                        />
                      ))}
                    </Flex>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column">
                    <AmountInput
                      label={loggedInUser.name}
                      text="$"
                      value={expense.splitByMe}
                      onChange={(e) => handleAmountChange(e, true, "split", -1)}
                    />
                    {expense.users.map((user, index) => (
                      <AmountInput
                        key={index}
                        label={user.email}
                        text="$"
                        value={user.splitAmount}
                        onChange={(e) =>
                          handleAmountChange(e, false, "split", index)
                        }
                      />
                    ))}
                    <CustomButton
                      type="primary"
                      label="Save changes"
                      onClick={validateAmounts}
                    />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column">
                    <AmountInput
                      label={loggedInUser.name}
                      text="%"
                      value={percentAmount[loggedInUser.email]}
                      onChange={(e) =>
                        handlePercentChange(e, loggedInUser.email)
                      }
                    />
                    {expense.users.map((user, index) => (
                      <AmountInput
                        key={index}
                        label={user.email}
                        text="%"
                        value={percentAmount[user.email]}
                        onChange={(e) => handlePercentChange(e, user.email)}
                      />
                    ))}
                    <CustomButton
                      type="primary"
                      label="Save changes"
                      onClick={validatePercents}
                    />
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </>
      </CustomModal>
    </>
  );
};

export default SplitMethodModal;
