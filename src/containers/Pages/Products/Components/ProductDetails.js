import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/UI/Modal";
import { Col, Row } from "react-bootstrap";
import "../styles.css";
import { imageUrl } from "../../../../urlConfig";

const ProductDetails = ({ modalShowPD, productDetails, setModalShowPD }) => {
  const ref = useRef();

  return (
    <Modal
      show={modalShowPD}
      onHide={(e) => setModalShowPD(false)}
      heading="Product Details"
      ref={ref}
    >
      <Col>
        <Row>
          <Col md={6}>
            <strong>Name: </strong> &nbsp;
            <p>{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Price: </strong> &nbsp;
              {productDetails.price}
            </p>
          </Col>

          <Col md={6}>
            <strong>Category: </strong> &nbsp;
            <p>
              {productDetails.category != null
                ? productDetails.category.name
                : "None"}
            </p>
          </Col>

          <Col md={6}>
            <strong>Quantity: </strong> &nbsp;
            <p>{productDetails.quantity}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>Description: </strong> &nbsp;
            <p>{productDetails.description}</p>
          </Col>
        </Row>

        <label>
          <strong>Picture</strong>
        </label>
        <Row>
          {productDetails.productPictures.map((picture) => (
            <Col sm={2} key={picture._id}>
              <div className="img-container">
                <img key={picture._id} src={imageUrl(picture.img)}></img>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Modal>
  );
};

export default ProductDetails;
