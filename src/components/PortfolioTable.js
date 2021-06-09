import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header, Table } from "antd";
import { data } from "../data";
import { numberWithCommas } from "../functions";
import axios from "axios";
const prices = require("../data.json");

function PortfolioTable() {
  const state = useSelector(state => state.user);

  const [ownedStocks, setOwnedStocks] = useState([]);

  useEffect(() => {
    if (state.loggedIn) {
      axios
        .get(`${process.env.BASE_URL}/user/${state.userId}`)
        .then(response => {
          setOwnedStocks(response.data["stocks_owned"]);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Qty Owned",
      dataIndex: "qtyOwned",
      key: "qtyOwned"
    },
    {
      title: "Value ($)",
      dataIndex: "value",
      key: "value"
    }
  ];

  // const mappedData = data.map(stock => ({
  //   name: stock.name,
  //   price: stock.price,
  //   qtyOwned: stock.qtyOwned,
  //   value: numberWithCommas(parseInt(stock.price * stock.qtyOwned)),
  //   key: stock.name
  // }));

  const mappedData = [];

  for (var i = ownedStocks.length - 1; i >= 0; i--) {
    var temp = {
      key: ownedStocks[i]["tx_num"],
      name: ownedStocks[i]["stock_name"],
      qtyOwned: ownedStocks[i]["qty_owned"],
      price: prices[state.currDate][ownedStocks[i]["stock_name"]],
      value: (
        prices[state.currDate][ownedStocks[i]["stock_name"]] *
        ownedStocks[i]["qty_owned"]
      ).toFixed(2),
      type: ownedStocks[i]["type"]
    };

    mappedData.push(temp);
  }

  return <Table dataSource={mappedData} columns={columns} />;
}

export default PortfolioTable;
