import React from "react";
import StockMarketTable from "./StockMarketTable";
import { Row, Col } from "antd";

function PnL() {
  return (
    <>
      <Row>
        <Col align={"middle"} span={24}>
          <h1>Stock Market</h1>
        </Col>
      </Row>
      <Row>
        <Col
          align={"middle"}
          md={{ offset: 2, span: 20 }}
          sm={{ offset: 0, span: 24 }}
        >
          <StockMarketTable />
        </Col>
      </Row>
    </>
  );
}

export default PnL;
