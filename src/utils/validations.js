export const validateManualAmounts = (type, expense) => {
  let totalAmount =
    type === "paid"
      ? parseFloat(expense.paidByMe)
      : parseFloat(expense.splitByMe);

  expense.users.forEach((user) => {
    totalAmount +=
      type === "paid"
        ? parseFloat(user.paidAmount)
        : parseFloat(user.splitAmount);
  });

  return parseFloat(totalAmount) === parseFloat(expense.amount);
};
