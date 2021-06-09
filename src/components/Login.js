import React, { Component } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { logInUser } from "../actions";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../functions";
import Header from "./Header";
import axios from "axios";

function Login() {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();
  let history = useHistory();

  const onFinish = values => {
    axios
      .post(`${BASE_URL}/login`, values)
      .then(response => {
        dispatch(logInUser({ id: response.data["_id"] }));
        history.push("/stockmarket");
      })
      .catch(err => {
        notification.error({
          message: "Could not login",
          description:
            "The username / password you inputted is wrong. Please try again."
        });
      });
  };

  return (
    <Row>
      <Col span={6} offset={9}>
        <Form onFinish={onFinish} name="loginForm">
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
