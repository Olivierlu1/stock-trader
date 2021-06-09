import React, { useRef, useEffect, useState } from "react";
import {
  Header,
  Table,
  Tag,
  Form,
  InputNumber,
  Button,
  notification
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { pnldata } from "../data";
import { numberWithCommas, BASE_URL } from "../functions";
import { updateBalance, dummyAction } from "../actions";
import axios from "axios";
const prices = require("../data.json");

function StockMarketTable() {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const [stocksOwned, setStocksOwned] = useState({});
  const [currDate, setCurrDate] = useState(0);
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (state.loggedIn) {
      axios
        .get(`${BASE_URL}/user/${state.userId}`)
        .then(response => {
          var stocks = response.data["stocks_owned"];
          var bigObj = {};
          for (var i = 0; i < stocks.length; i++) {
            bigObj[stocks[i]["stock_name"]] = stocks[i];
          }
          setStocksOwned(bigObj);
          setCurrDate(response.data["curr_date"]);
        })
        .catch(error => console.log("ERROR"));
    }
  }, [render, state.currDate]);

  const onFinish = (values, record) => {
    if (type != "buy" && type != "sell") {
      return notification.error({
        message: "Something went wrong",
        description: "Please try again."
      });
    }

    if (!values["quantity"]) {
      return notification.error({
        message: "Please enter a valid number",
        description: "Please try again."
      });
    }

    const data = {
      id: state.userId,
      stock_name: record.name,
      quantity: values["quantity"],
      price: record.price,
      type: type,
      value: parseInt((record.price * values["quantity"]).toFixed(2))
    };
    axios
      .post(`${BASE_URL}/stocks`, data)
      .then(response => {
        dispatch(dummyAction());
        setRender(!render);
      })
      .catch(err =>
        notification.error({
          message: `Error Status Code ${err.response.status}`,
          description: err.response.data
        })
      );
  };

  const layout = {
    wrapperCol: { span: 4 }
  };

  const tailLayout = {
    wrapperCol: { offset: 2, span: 2 }
  };

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
      title: "Shared Owned",
      dataIndex: "qtyOwned",
      key: "qtyOwned"
    },
    {
      title: "Buy / Sell",
      dataIndex: "type",
      key: "type",
      render: (text, record, index) => {
        return (
          <Form
            {...layout}
            onFinish={e => onFinish(e, record)}
            name="loginForm"
          >
            <Form.Item label="Amount" name="quantity">
              <InputNumber precision={0} />
            </Form.Item>
            <Form.Item style={{ float: "left" }}>
              <Button
                onClick={() => setType("buy")}
                type="primary"
                htmlType="submit"
              >
                Buy
              </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                onClick={() => setType("sell")}
                type="danger"
                htmlType="submit"
              >
                Sell
              </Button>
            </Form.Item>
          </Form>
        );
      }
    }
  ];

  const mappedData = [];
  for (var key in prices[currDate]) {
    var temp = {
      key: key,
      name: key,
      price: prices[currDate][key]
    };

    if (key in stocksOwned) {
      temp["qtyOwned"] = stocksOwned[key]["qty_owned"];
    } else {
      temp["qtyOwned"] = 0;
    }
    mappedData.push(temp);
  }

  return <Table dataSource={mappedData} columns={columns} />;
}

export default StockMarketTable;
