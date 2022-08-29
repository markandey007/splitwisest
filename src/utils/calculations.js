export const showThisExpense = (expense, email) => {
  if (expense.createdBy === email) return true;
  expense.users.forEach((user) => {
    if (user.email === email) return true;
  });

  return false;
};

export const getOwedAndOwes = (expenses, email) => {
  const list = {};

  expenses.forEach((expense) => {
    if (showThisExpense(expense, email)) {
      if (expense.paidByMe < expense.splitByMe) {
        let totalPeople = 0;
        expense.users.forEach((user) => {
          if (user.paidAmount > user.splitAmount) totalPeople++;
        });

        expense.users.forEach((user) => {
          if (user.paidAmount > user.splitAmount) {
            let amnt = parseFloat(
              (parseFloat(expense.splitByMe) - parseFloat(expense.paidByMe)) /
                parseFloat(totalPeople)
            );
            if (user.email in list) list[user.email] += amnt;
            else list[user.email] = amnt;
          }
        });
      } else if (expense.paidByMe > expense.splitByMe) {
        let totalPeople = 0;
        expense.users.forEach((user) => {
          if (user.paidAmount < user.splitAmount) totalPeople++;
        });

        expense.users.forEach((user) => {
          if (user.paidAmount < user.splitAmount) {
            let amnt = parseFloat(
              (parseFloat(expense.paidByMe) - parseFloat(expense.splitByMe)) /
                parseFloat(totalPeople)
            );
            if (user.email in list) list[user.email] -= amnt;
            else list[user.email] = -1 * amnt;
          }
        });
      }
    }
  });

  const result = { iOwe: [], theyOwe: [] };
  for (let key in list) {
    if (list[key] < 0) {
      result.theyOwe.push({ email: key, amount: -1 * list[key] });
    } else {
      result.iOwe.push({ email: key, amount: list[key] });
    }
  }

  return result;
};
