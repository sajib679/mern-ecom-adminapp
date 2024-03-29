import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Button } from "react-bootstrap";
import { imageUrl } from "../../../../urlConfig";
import {
  updateProduct as update,
  deleteProductImage,
} from "../../../../actions/product.action";
import Input from "../../../../components/UI/Input";
import Modal from "../../../../components/UI/Modal";
import axios from "../../../../helpers/axios";

const UpdateProductModal = ({
  modalShowPU,
  setModalShowPU,
  productDetails,
  createCategoryList,
}) => {
  const {
    _id,
    name,
    price,
    quantity,
    description,
    productPictures: pictures,
    category,
  } = productDetails;

  const removeThumbRef = useRef();

  useEffect(() => {}, []);

  const [productName, setProductName] = useState(name);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [productPrice, setProductPrice] = useState(price);
  const [productDescription, setProductDescription] = useState(description);
  const [productCategoryId, setProductCategoryId] = useState(category._id);
  const [productPictures, setProductPictures] = useState(pictures);
  const [imagePreview, setImagePreview] = useState(pictures);

  const products = useSelector((state) => state.product.products);
  const categoryAll = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const updateProduct = () => {
    const form = new FormData();
    form.append("_id", _id);
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("quantity", productQuantity);
    form.append("description", productDescription);
    form.append("category", productCategoryId);

    for (const picture of productPictures) {
      form.append("productPicture", picture);
    }

    dispatch(update(form));
    setModalShowPU(false);
  };

  const handleProductPictures = (e) => {
    const seletedNewImage = [...e.target.files];
    setProductPictures((prevState) => [...prevState, ...seletedNewImage]);
    const newImg = seletedNewImage.map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreview((prevState) => [...prevState, ...newImg]);
  };

  const removePic = ({ i, imgName, productId, imageId }) => {
    if (imageId && productId) {
      dispatch(deleteProductImage({ imgName, productId, imageId })).then(
        (succes) => {
          if (succes) {
            const img = productPictures.filter((arr, index) => index !== i);
            setProductPictures(img);
            const newArray = imagePreview.filter((arr, index) => index !== i);
            setImagePreview(newArray);
            return;
          }
        }
      );
    }
    const img = productPictures.filter((arr, index) => index !== i);
    setProductPictures(img);
    const newArray = imagePreview.filter((arr, index) => index !== i);
    setImagePreview(newArray);
  };

  return (
    <Modal
      show={modalShowPU}
      onHide={() => setModalShowPU(false)}
      heading="Update Product"
      footerbutton="save"
      buttonOnSave={updateProduct}
    >
      <Input
        label="Product Name"
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Input
        label="Product Price"
        type="text"
        value={productPrice}
        onChange={(e) => {
          setProductPrice(e.target.value);
        }}
      />
      <Input
        label="Product Quantity"
        type="text"
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
      />
      <Input
        label="Product Description"
        type="text"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />

      <label htmlFor="select">Parent Category</label>
      <select
        className="form-control"
        value={productCategoryId}
        onChange={(e) => setProductCategoryId(e.target.value)}
      >
        {createCategoryList(categoryAll.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <hr />

      <Row>
        {imagePreview.map((picture, index) => (
          <Col
            sm={2}
            key={index}
            ref={removeThumbRef}
            onClick={() =>
              removePic({
                i: index,
                imgName: picture.img,
                productId: _id,
                imageId: picture._id,
              })
            }
          >
            <div className="img-container">
              <img
                alt=""
                key={picture._id}
                src={picture.img ? imageUrl(picture.img) : picture}
              ></img>
            </div>
          </Col>
        ))}
      </Row>
      <hr />

      <Input
        // label="Product Image"
        type="file"
        onChange={handleProductPictures}
      />
    </Modal>
  );
};

export default UpdateProductModal;
