export const logInUser = value => {
  // value = { id: "asd" }
  return {
    type: "LOGIN_USER",
    payload: value
  };
};

export const resetUser = () => {
  return {
    type: "RESET_USER"
  };
};

export const logOutUser = () => {
  return {
    type: "LOGOUT_USER"
  };
};

export const updateBalance = value => {
  return {
    type: "UPDATE_BALANCE",
    payload: value
  };
};

export const updateStocksOwned = value => {
  return {
    type: "UPDATE_STOCKS_OWNED",
    payload: value
  };
};

export const dummyAction = () => {
  return {
    type: "dummy"
  };
};

export const setDay = value => {
  return {
    type: "SET_DAY",
    payload: value
  };
};

export const nextDay = () => {
  return {
    type: "NEXT_DAY"
  };
};
