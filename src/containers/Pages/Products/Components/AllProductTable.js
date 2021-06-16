import React, { useState } from "react";
import Table from "../../../../components/UI/Table";
import { Col, Row, Button } from "react-bootstrap";
import "../styles.css";

const AllProductTable = ({
  products,
  ShowProductDetails,
  ShowProductUpModal,
}) => {
  return (
    <Table
      tableHeadRow={
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Category</th>
          <th>Update</th>
        </tr>
      }
    >
      {products.length > 0 &&
        products.map((product, index) => (
          <tr key={product._id}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity} </td>
            <td>{product.category != null ? product.category.name : "None"}</td>
            <td>
              <Row className="justify-content-md-around m-auto ">
                <Button
                  className="mb-sm-1 mb-lg-0"
                  size="sm"
                  variant="outline-info"
                  onClick={() => ShowProductDetails(product)}
                >
                  Details
                </Button>
                <Button
                  className="mt-sm-1 mt-lg-0"
                  size="sm"
                  variant="outline-warning"
                  onClick={() => ShowProductUpModal(product)}
                >
                  Edit
                </Button>
              </Row>
            </td>
          </tr>
        ))}
    </Table>
  );
};

export default AllProductTable;
