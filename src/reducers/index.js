import { combineReducers } from "redux";

const initialState = {
  username: "",
  balance: 0,
  loggedIn: false,
  userId: "",
  currDate: 0,
  dummy: 0,
  stocks_owned: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return Object.assign({}, state, {
        loggedIn: true,
        userId: action.payload.id
      });
    case "LOGOUT_USER":
      return Object.assign({}, state, {
        loggedIn: false,
        userId: ""
      });
    case "RESET_USER":
      return {
        username: "",
        balance: 0,
        loggedIn: false,
        userId: "",
        currDate: 0,
        dummy: 0,
        stocks_owned: []
      };
    case "UPDATE_BALANCE":
      return Object.assign({}, state, {
        balance: action.payload.balance
      });
    case "NEXT_DAY":
      return Object.assign({}, state, {
        currDate: state.currDate + 1
      });
    case "SET_DAY":
      return Object.assign({}, state, {
        currDate: action.payload.day
      });
    case "UPDATE_STOCKS_OWNED":
      return { ...state, stocks_owned: action.payload.stocks_owned };
    case "dummy":
      return Object.assign({}, state, {
        dummy: state.dummy + 1
      });
    default:
      return state;
  }
};

export default combineReducers({ user: userReducer });
