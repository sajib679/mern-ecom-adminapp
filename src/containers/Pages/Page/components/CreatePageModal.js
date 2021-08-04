import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddPageModal from "../../../../components/UI/Modal";
import Input from "../../../../components/UI/Input";
import { createPage } from "../../../../actions/page.action";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";

const CreatePageModal = ({
  createPageModal,
  setCreatePageModal,
  categoryList,
}) => {
  const initialState = "";
  const [pageTitle, setPageTitle] = useState(initialState);
  const [categoryId, setCategoryId] = useState(initialState);
  const [description, setDescription] = useState(initialState);
  const [bannersImage, setBannersImage] = useState([]);
  const [productsImage, setProductsImage] = useState([]);
  const [bannersImagePreview, setBannersImagePreview] = useState([]);
  const [productsImagePreview, setProductsImagePreview] = useState([]);

  const dispatch = useDispatch();

  const createPageForm = () => {
    const form = new FormData();
    form.append("pageTitle", pageTitle);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", "page");
    bannersImage.forEach((item, index) => form.append("bannersImage", item));
    productsImage.forEach((item, index) => form.append("productsImage", item));

    dispatch(createPage(form));
    setCreatePageModal(false);
    setBannersImage([]);
    setProductsImage([]);
  };

  const handleBannerImage = (e) => {
    var fileList = Array.from(e.target.files);
    setBannersImage([...bannersImage, ...fileList]);

    const imgPreview = fileList.map((file) => {
      return URL.createObjectURL(file);
    });
    setBannersImagePreview((prevState) => [...prevState, ...imgPreview]);
  };

  const handleProductImage = (e) => {
    var fileList = Array.from(e.target.files);
    setProductsImage([...productsImage, ...fileList]);
    const imgPreview = fileList.map((file) => {
      return URL.createObjectURL(file);
    });
    setProductsImagePreview((prevState) => [...prevState, ...imgPreview]);
  };

  const rmProductImg = ({ index }) => {
    productsImage.splice(index, 1);
    setProductsImage([...productsImage]);
    productsImagePreview.splice(index, 1);
    setProductsImagePreview([...productsImagePreview]);
  };

  const rmBannerImg = ({ index }) => {
    bannersImage.splice(index, 1);
    setBannersImage([...bannersImage]);
    bannersImagePreview.splice(index, 1);
    setBannersImagePreview([...bannersImagePreview]);
  };

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
        <Col>
          <Input label="Banner Image" type="file" onChange={handleBannerImage}>
            <Row>
              {bannersImagePreview.map((picture, index) => (
                <Col sm={2} key={index}>
                  <div className="img-container">
                    <img src={picture}></img>
                    <span
                      className="remove-icon"
                      onClick={() => rmBannerImg({ index: index })}
                    >
                      <AiOutlineDelete />
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            label="Product Image"
            type="file"
            onChange={handleProductImage}
          >
            <Row>
              {productsImagePreview.map((picture, index) => (
                <Col sm={2} key={index}>
                  <div className="img-container">
                    <img src={picture}></img>
                    <span
                      className="remove-icon"
                      onClick={() => rmProductImg({ index: index })}
                    >
                      <AiOutlineDelete />
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </Input>
        </Col>
      </Row>
    </AddPageModal>
  );
};

export default CreatePageModal;
