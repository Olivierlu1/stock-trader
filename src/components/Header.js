import React, { useState, useEffect } from "react";
import { PageHeader, Button, Typography, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./styles/Header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { setDay, updateStocksOwned, logOutUser, nextDay } from "../actions";
import { indexToDate } from "../functions";
const { Title } = Typography;

function Header() {
  const state = useSelector(state => state.user);
  const [balance, setBalance] = useState(0);
  const [currDate, setDate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.loggedIn) {
      axios
        .get(`${process.env.BASE_URL}/user/${state.userId}`)
        .then(response => {
          setBalance(response.data.balance);
          setDate(response.data["curr_date"]);
          // dispatch(setDay(response.data["curr_date"]));
          // dispatch(updateStocksOwned(response.data["stocks_owned"]));
        })
        .catch(error => console.log("ERROR"));
    }
  });

  const advanceDay = () => {
    axios
      .post(`${process.env.BASE_URL}/nextday`, { id: state.userId })
      .then(response => {
        notification.success({
          message: "Advanced a month"
        });
        setDate(currDate + 1);
        dispatch(nextDay());
      });
  };

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <PageHeader
      className="site-page-header"
      title={
        <Link to={"/"}>
          <Title level={3}>Stock Trader Program</Title>
        </Link>
      }
      subTitle="Built by Olivier and Vishal"
      extra={[
        state.loggedIn ? (
          <p>
            {indexToDate[currDate]} Balance: ${balance}
          </p>
        ) : (
          <p></p>
        ),
        state.loggedIn ? (
          <p></p>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        ),
        !state.loggedIn ? (
          <Link to={"/createuser"}>
            <Button>Sign Up</Button>
          </Link>
        ) : (
          <p></p>
        ),
        state.loggedIn ? (
          <Button onClick={() => logOut()}>Logout</Button>
        ) : (
          <p></p>
        ),
        state.loggedIn ? (
          <Button onClick={() => advanceDay()}>Next Month</Button>
        ) : (
          <p></p>
        )
      ]}
      tags={[
        <Link to={"/stockmarket"}>
          <Button>Stock Market</Button>
        </Link>,
        <Link to={"/portfolio"}>
          <Button style={{ marginLeft: "100px" }}>Portfolio</Button>
        </Link>,
        <Link to={"/pnl"}>
          <Button>PnL History</Button>
        </Link>
      ]}
    />
  );
}

export default Header;
