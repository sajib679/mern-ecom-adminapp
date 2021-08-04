import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/UI/Modal";
import { Col, Row } from "react-bootstrap";
import { imageUrl } from "../../../../urlConfig";
import { AiOutlineDelete } from "react-icons/ai";
import Input from "../../../../components/UI/Input";
import { deletePageImage, updatePage } from "../../../../actions/page.action";
import axios from "../../../../helpers/axios";

const UpdatePage = ({
  modalShowPU,
  setModalShowPU,
  pageDetails,
  categoryList,
}) => {
  const [pageTitle, setPageTitle] = useState(pageDetails.pageTitle);
  const [categoryId, setCategoryId] = useState(pageDetails.category._id);
  const [description, setDescription] = useState(pageDetails.description);
  const [bannersImage, setBannersImage] = useState(pageDetails.bannersImage);
  const [productsImage, setProductsImage] = useState(pageDetails.productsImage);
  const [newBannersImage, setNewBannersImage] = useState([]);
  const [newProductsImage, setNewProductsImage] = useState([]);
  const [newProductsImagePreview, setNewProductsImagePreview] = useState([]);
  const [newBannersImagePreview, setNewBannersImagePreview] = useState([]);

  const dispatch = useDispatch();

  const updatePageForm = () => {
    const form = new FormData();

    form.append("pageTitle", pageTitle);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", "page");
    newBannersImage.forEach((item, index) => form.append("bannersImage", item));
    newProductsImage.forEach((item, index) =>
      form.append("productsImage", item)
    );

    dispatch(updatePage(form));
    setModalShowPU(false);
    setBannersImage([]);
    setProductsImage([]);
  };

  const handleBannerImage = (e) => {
    var newFileList = Array.from(e.target.files);
    setNewBannersImage((prevState) => [...prevState, ...newFileList]);
    const newImgPreview = newFileList.map((file) => {
      return URL.createObjectURL(file);
    });
    setNewBannersImagePreview((prevState) => [...prevState, ...newImgPreview]);
  };

  const handleProductImage = (e) => {
    var newFileList = Array.from(e.target.files);
    setNewProductsImage((prevState) => [...prevState, ...newFileList]);
    const newImgPreview = newFileList.map((file) => {
      return URL.createObjectURL(file);
    });
    setNewProductsImagePreview((prevState) => [...prevState, ...newImgPreview]);
  };

  const rmProductImg = ({ index, imgName, pageId, imageId }) => {
    if (imageId && imgName) {
      dispatch(deletePageImage({ imgName, pageId, imageId })).then((succes) => {
        if (succes) {
          productsImage.splice(index, 1);
          setProductsImage([...productsImage]);
          return;
        }
      });
    } else {
      newProductsImage.splice(index, 1);
      setNewProductsImage([...newProductsImage]);
      newProductsImagePreview.splice(index, 1);
      setNewProductsImagePreview(newProductsImagePreview);
    }
  };

  const rmBannerImg = ({ index, imgName, pageId, imageId }) => {
    if (imageId && imgName) {
      dispatch(deletePageImage({ imgName, pageId, imageId })).then((succes) => {
        if (succes) {
          bannersImage.splice(index, 1);
          setBannersImage([...bannersImage]);
          return;
        }
      });
    } else {
      newBannersImage.splice(index, 1);
      setNewBannersImage([...newBannersImage]);
      newBannersImagePreview.splice(index, 1);
      setNewBannersImagePreview(newBannersImagePreview);
    }
  };

  const ref = useRef();

  return (
    <Modal
      show={modalShowPU}
      onHide={(e) => setModalShowPU(false)}
      ref={ref}
      heading="Update Page"
      footerbutton="save"
      buttonOnSave={updatePageForm}
    >
      <Col>
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
            <Input
              label="Banner Image"
              type="file"
              onChange={handleBannerImage}
            >
              <Row>
                {newBannersImagePreview.map((picture, index) => (
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
                {newProductsImagePreview.map((picture, index) => (
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

        <label>
          <strong>Banner Images</strong>
        </label>
        <Row>
          {bannersImage.map((picture, index) => (
            <Col sm={2} key={picture._id}>
              <div className="img-container">
                <img key={picture._id} src={imageUrl(picture.img)}></img>
                <span
                  className="remove-icon"
                  onClick={() =>
                    rmBannerImg({
                      index: index,
                      imageId: picture._id,
                      imgName: picture.img,
                      pageId: pageDetails._id,
                    })
                  }
                >
                  <AiOutlineDelete />
                </span>
              </div>
            </Col>
          ))}
        </Row>
        <label>
          <strong>Product Images</strong>
        </label>
        <Row>
          {productsImage.map((picture, index) => (
            <Col sm={2} key={picture._id}>
              <div className="img-container">
                <img key={picture._id} src={imageUrl(picture.img)}></img>
                <span
                  className="remove-icon"
                  onClick={() =>
                    rmProductImg({
                      index: index,
                      imageId: picture._id,
                      imgName: picture.img,
                      pageId: pageDetails._id,
                    })
                  }
                >
                  <AiOutlineDelete />
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Modal>
  );
};

export default UpdatePage;
