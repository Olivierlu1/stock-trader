import React from "react";
import PnLTable from "./PnLTable";
import { Row, Col } from "antd";

function PnL() {
  return (
    <>
      <Row>
        <Col align={"middle"} span={24}>
          <h1>PnL History</h1>
        </Col>
      </Row>
      <Row>
        <Col
          align={"middle"}
          md={{ offset: 2, span: 20 }}
          sm={{ offset: 0, span: 24 }}
        >
          <PnLTable />
        </Col>
      </Row>
    </>
  );
}

export default PnL;
