import { Flex } from "@chakra-ui/react";
import OwedList from "../OwedList";
import Actions from "./Actions";
import Balance from "./Balance";
import React, { useEffect, useState } from "react";
import { getLoggedInUser, loadExpensesFromCart } from "../../storage";
import { getOwedAndOwes } from "../../utils/calculations";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [owedAndOwesLists, setOwedAndOwesLists] = useState({});

  const loadAndSet = () => {
    expenses = loadExpensesFromCart();
    setExpenses(expenses);

    owedAndOwesLists = getOwedAndOwes(expenses, getLoggedInUser().email);
    setOwedAndOwesLists(owedAndOwesLists);
  };

  useEffect(() => {
    loadAndSet();
  }, []);

  return (
    <Flex direction="column" w="60%" h="100%" spacing={0} boxShadow="xl">
      <Actions title="Dashboard" />
      <Balance owedAndOwesLists={owedAndOwesLists} />
      <OwedList owedAndOwesLists={owedAndOwesLists} loadAndSet={loadAndSet} />
    </Flex>
  );
};

export default Dashboard;
