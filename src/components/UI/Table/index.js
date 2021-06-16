import React from "react";
import { Table } from "react-bootstrap";
import "./styles.css";

const Index = (props) => {
  return (
    <Table responsive bordered hover>
      <thead>{props.tableHeadRow}</thead>
      <tbody>{props.children}</tbody>
    </Table>
  );
};

export default Index;
