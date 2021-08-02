import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/UI/Modal";
import { Col, Row } from "react-bootstrap";
import { imageUrl } from "../../../../urlConfig";

const PageDetails = ({ modalShowPD, setModalShowPD, pageDetails }) => {
  const ref = useRef();

  return (
    <Modal
      show={modalShowPD}
      onHide={(e) => setModalShowPD(false)}
      heading="Page Details"
      ref={ref}
    >
      <Col>
        <Row>
          <Col md={6}>
            <strong>Name: </strong> &nbsp;
            <p>{pageDetails.pageTitle}</p>
          </Col>

          <Col md={6}>
            <strong>Category: </strong> &nbsp;
            <p>
              {pageDetails.category != null
                ? pageDetails.category.name
                : "None"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>Description: </strong> &nbsp;
            <p>{pageDetails.description}</p>
          </Col>
        </Row>

        <label>
          <strong> Banner Images</strong>
        </label>
        <Row>
          {pageDetails.bannersImage.map((picture) => (
            <Col sm={2} key={picture._id}>
              <div className="img-container">
                <img key={picture._id} src={imageUrl(picture.img)}></img>
              </div>
            </Col>
          ))}
        </Row>
        <label>
          <strong>Product Images</strong>
        </label>
        <Row>
          {pageDetails.productsImage.map((picture) => (
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

export default PageDetails;
