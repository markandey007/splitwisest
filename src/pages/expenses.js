import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Actions from "../components/Dashboard/Actions";
import Expense from "../components/Expense";
import Layout from "../components/Layout";
import { getLoggedInUser, loadExpensesFromCart } from "../storage";
import { showThisExpense } from "../utils/calculations";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    setExpenses(loadExpensesFromCart());
    setLoggedInUser(getLoggedInUser());
  }, []);

  return (
    <Layout title="All expenses - Splitwisest">
      <Flex
        direction="column"
        w="60%"
        h="100%"
        spacing={0}
        boxShadow="2xl"
        overflowY="scroll"
      >
        <Actions title="All expenses" />
        <Flex direction="column" gap="6" p="4">
          {expenses.length > 0 ? (
            <>
              {expenses.map(
                (expense, index) =>
                  showThisExpense(expense, loggedInUser.email) && (
                    <Expense
                      expense={expense}
                      key={index}
                      setExpenses={setExpenses}
                    />
                  )
              )}
            </>
          ) : (
            <Heading fontSize="2xl" alignSelf="center" color="danger.600">
              You do not have any expenses yet
            </Heading>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
}
