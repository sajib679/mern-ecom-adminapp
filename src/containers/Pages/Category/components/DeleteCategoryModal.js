import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../../components/UI/Input";
import DelCatModal from "../../../../components/UI/Modal";

export const DeleteCategoryModal = (props) => {
  const {
    show,
    onHide,
    buttonOnSave,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;
  return (
    <DelCatModal
      show={show}
      onHide={onHide}
      heading="Delete Category"
      buttonOnSave={buttonOnSave}
      footerbutton="Delete"
    >
      <Row>
        <Col sm={1}></Col>
        <Col>
          <h6>Checked Category</h6>
        </Col>
        <Col>
          <h6>Parent Category</h6>
        </Col>
      </Row>
      <hr></hr>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col sm={1}>
              <span>{index + 1}</span>
            </Col>
            <Col>
              <span key={index}>{item.name}</span>
            </Col>
            <Col>
              {/* <label htmlFor="select">Parent Category</label> */}
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,

                    "checked"
                  )
                }
              >
                <option value="">None</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        ))}
    </DelCatModal>
  );
};

export default DeleteCategoryModal;
