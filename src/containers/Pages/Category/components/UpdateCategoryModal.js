import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../../components/UI/Input";
import UpCatModal from "../../../../components/UI/Modal";

export const UpdateCategoryModal = (props) => {
  const {
    show,
    onHide,
    buttonOnSave,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <UpCatModal
      show={show}
      onHide={onHide}
      heading="Update Category"
      buttonOnSave={buttonOnSave}
      footerbutton="Save"
    >
      <Row>
        <Col>
          <h6>Expanded Category</h6>
        </Col>
        <Col>
          <h6>Parent Category</h6>
        </Col>
        <Col>
          <h6>Type</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                // label="Category Name"
                type="text"
                placeholder={`Enter Category Name`}
                value={item.name}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
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
                    index,
                    "expanded"
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
            <Col>
              {/* <label htmlFor="select">Category Type</label> */}
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value={"None"}>
                  {item.type == ("undefined" || undefined) ? "None" : item.type}
                </option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}

      <hr></hr>

      <Row>
        <Col>
          <h6>Checked Category</h6>
        </Col>
        <Col>
          <h6>Parent Category</h6>
        </Col>
        <Col>
          <h6>Type</h6>
        </Col>
      </Row>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                // label="Category Name"
                type="text"
                placeholder={`Enter Category Name`}
                value={item.name}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
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
                    index,
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
            <Col>
              {/* <label htmlFor="select">Category Type</label> */}
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value={item.type}>
                  {item.type == ("undefined" || undefined) ? "None" : item.type}
                </option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}

      <hr></hr>

      <Input
        label="Category Image"
        type="file"
        onChange={handleCategoryImage}
      />
    </UpCatModal>
  );
};

export default UpdateCategoryModal;
