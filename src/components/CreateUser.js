import React, { Component } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { resetUser } from "../actions";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../functions";
import Header from "./Header";
import axios from "axios";

function CreateUser() {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();
  let history = useHistory();

  const onFinish = values => {
    axios
      .post(`${BASE_URL}/user`, values)
      .then(response => {
        dispatch(resetUser());
        notification.success({
          message: "Account Successfully Created",
          description: "Please login now"
        });
        history.push("/stockmarket");
      })
      .catch(err => {
        notification.error({
          message: "Could not Signup",
          description: "Something went wrong. Please try again."
        });
      });
  };

  return (
    <Row>
      <Col span={6} offset={9}>
        <h1>Sign Up!</h1>
        <Form onFinish={onFinish} name="loginForm">
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default CreateUser;
