import React from "react";
import { Col, Row } from "react-bootstrap";
import AddPageModal from "../../../../components/UI/Modal";
import Input from "../../../../components/UI/Input";
import { FcRemoveImage } from "react-icons/fc";

const CreatePageModal = (props) => {
  const {
    createPageModal,
    setCreatePageModal,
    createPageForm,
    pageTitle,
    setPageTitle,
    categoryId,
    setCategoryId,
    categoryList,
    description,
    setDescription,
    handleBannerImage,
    bannersImage,
    handleProductImage,
    productsImage,
    setBannersImage,
  } = props;
  return (
    <AddPageModal
      show={createPageModal}
      onHide={() => setCreatePageModal(false)}
      heading="Create Page"
      footerbutton="Create"
      buttonOnSave={createPageForm}
    >
      <Row>
        <Col sm={6}>
          <Input
            placeholder="Enter Page Title"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          ></Input>
        </Col>
        <Col sm={6}>
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
      <Row>
        <Col>
          <Input
            placeholder="Enter Page Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Input label="Banner Image" type="file" onChange={handleBannerImage}>
            <div>
              {bannersImage.map((item, index) => (
                <Row className="image-text" key={index}>
                  {item.name}
                  <span
                    onClick={() => {
                      bannersImage.splice(index, 1);
                      setBannersImage([...bannersImage]);
                    }}
                  >
                    <FcRemoveImage />
                  </span>
                </Row>
              ))}
            </div>
          </Input>
        </Col>
        <Col sm={6}>
          <Input
            label="Product Image"
            type="file"
            onChange={handleProductImage}
          >
            {productsImage.map((item, index) => (
              <Row className="image-text" key={index}>
                {item.name}
              </Row>
            ))}
          </Input>
        </Col>
      </Row>
    </AddPageModal>
  );
};

export default CreatePageModal;
