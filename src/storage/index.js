export const isUserLoggedIn = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("user")) return true;
    return false;
  }
  return false;
};

export const logInUserToLocalStorage = (name, email, next) => {
  const user = { name: name, email: email };
  if (typeof window !== undefined) {
    localStorage.setItem("user", JSON.stringify(user));
    next();
  }
};

export const logOutFromLocalStorage = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("user");
    next();
  }
};

export const getLoggedInUser = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
  return { name: "", email: "" };
};

export const saveExpenseToStorage = (expense, next) => {
  let expenses = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("expenses")) {
      expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    expenses.push({
      ...expense,
      count: 1,
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    next();
  }
};

export const loadExpensesFromCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("expenses")) {
      return JSON.parse(localStorage.getItem("expenses"));
    }
    return [];
  }
};

export const removeExpenseFromCart = (id) => {
  let expenses = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("expenses")) {
      expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    expenses.map((expense, index) => {
      if (expense.id === id) expenses.splice(index, 1);
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
    return expenses;
  }
  return [];
};
