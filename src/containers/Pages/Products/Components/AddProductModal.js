import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/UI/Input";
import Modal from "../../../../components/UI/Modal";
import { addProduct } from "../../../../actions/product.action";

import "../styles.css";

const AddProductModal = ({ modalShow, setModalShow, createCategoryList }) => {
  const initialState = "";
  const [productName, setProductName] = useState(initialState);
  const [productQuantity, setProductQuantity] = useState(initialState);
  const [productPrice, setProductPrice] = useState(initialState);
  const [productDescription, setProductDescription] = useState(initialState);
  const [productCategoryId, setProductCategoryId] = useState(initialState);
  const [productPictures, setProductPictures] = useState([]);
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const createProduct = () => {
    const form = new FormData();
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("quantity", productQuantity);
    form.append("description", productDescription);
    form.append("category", productCategoryId);

    for (const picture of productPictures) {
      form.append("productPicture", picture);
    }

    dispatch(addProduct(form));
    setModalShow(false);
  };

  const handleProductPictures = (e) => {
    const allimg = [...e.target.files];
    setProductPictures([...productPictures, ...allimg]);
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      heading="Create Product"
      footerbutton="Save"
      buttonOnSave={createProduct}
    >
      <Input
        label="Product Name"
        type="text"
        placeholder={`Enter Product Name`}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Input
        label="Product Price"
        type="text"
        placeholder={`Enter Product Price`}
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <Input
        label="Product Quantity"
        type="text"
        placeholder={`Enter Product Quantity`}
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
      />
      <Input
        label="Product Description"
        type="text"
        placeholder={`Enter Product Description`}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />

      <label htmlFor="select">Parent Category</label>
      <select
        className="form-control"
        value={productCategoryId}
        onChange={(e) => setProductCategoryId(e.target.value)}
      >
        {createCategoryList(category.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <hr />
      {productPictures.map((pic, index) => (
        <div key={index}> {pic.name} </div>
      ))}
      <Input
        // label="Product Image"
        type="file"
        onChange={handleProductPictures}
      />
    </Modal>
  );
};

export default AddProductModal;
