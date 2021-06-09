import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import PortfolioTable from "./PortfolioTable";

function Portfolio() {
  const state = useSelector(state => state.user);
  if (state.loggedIn) {
    return (
      <>
        <Row>
          <Col align={"middle"} span={24}>
            <h1>Portfolio</h1>
          </Col>
        </Row>
        <Row>
          <Col
            align={"middle"}
            md={{ offset: 2, span: 20 }}
            sm={{ offset: 0, span: 24 }}
          >
            <PortfolioTable />
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <Row>
        <Col align={"middle"} span={24}>
          <h1>Welcome! Please login to view your portfolio</h1>
        </Col>
      </Row>
    );
  }
}

export default Portfolio;
