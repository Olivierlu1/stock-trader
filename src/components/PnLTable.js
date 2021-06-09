import React, { useRef, useEffect, useState } from "react";
import { Header, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { pnldata } from "../data";
import { numberWithCommas } from "../functions";
import axios from "axios";

function PnLTable() {
  const state = useSelector(state => state.user);

  const [ownedStocks, setOwnedStocks] = useState([]);

  useEffect(() => {
    if (state.loggedIn) {
      axios
        .get(`${process.env.BASE_URL}/user/${state.userId}`)
        .then(response => {
          setOwnedStocks(response.data["stock_history"]);
        })
        .catch(err => console.log(err));
    }
  }, []);
  const columns = [
    {
      title: "Transaction #",
      dataIndex: "transaction_number",
      key: "transaction_number"
    },
    {
      title: "Stock Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Qty Purchased / Sold",
      dataIndex: "qtyOwned",
      key: "qtyOwned"
    },
    {
      title: "Value ($)",
      dataIndex: "value",
      key: "value"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: text => {
        if (text == "buy") {
          return <Tag color="green">Buy</Tag>;
        } else {
          return <Tag color="volcano">Sell</Tag>;
        }
      }
    }
  ];

  const mappedData = [];
  for (var i = ownedStocks.length - 1; i >= 0; i--) {
    var temp = {
      key: ownedStocks[i]["tx_num"],
      transaction_number: ownedStocks[i]["tx_num"],
      name: ownedStocks[i]["stock_name"],
      price: ownedStocks[i]["price"],
      qtyOwned: ownedStocks[i]["quantity"],
      value: (ownedStocks[i]["price"] * ownedStocks[i]["quantity"]).toFixed(2),
      type: ownedStocks[i]["type"]
    };

    mappedData.push(temp);
  }

  return <Table dataSource={mappedData} columns={columns} />;
}

export default PnLTable;
