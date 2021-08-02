import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "./../../../components/Layout";
import { Col, Row, Button } from "react-bootstrap";

import AllProductTable from "./Components/AllProductTable";
import UpdateProductModal from "./Components/UpdateProductModal";
import ProductDetails from "./Components/ProductDetails";
import AddProductModal from "./Components/AddProductModal";

import "./styles.css";

const Products = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPD, setModalShowPD] = useState(false);
  const [modalShowPU, setModalShowPU] = useState(false);

  const [productDetails, setProductDetails] = useState({});

  const products = useSelector((state) => state.product.products);

  const createCategoryList = (catParams, options = []) => {
    for (const category of catParams) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const ShowProductDetails = (productDetails) => {
    setProductDetails(productDetails);
    setModalShowPD(true);
  };

  const ShowProductUpModal = (productDetails) => {
    setProductDetails(productDetails);
    setModalShowPU(true);
  };

  return (
    <Layout
      sidebar
      button
      name="Products"
      buttonAdd="Create"
      buttonEdit="Update"
      buttonDelete="Delete"
      addOnClick={() => setModalShow(true)}
    >
      {
        <AllProductTable
          products={products}
          ShowProductDetails={ShowProductDetails}
          ShowProductUpModal={ShowProductUpModal}
        />
      }
      {modalShow ? (
        <AddProductModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          createCategoryList={createCategoryList}
        />
      ) : null}
      {modalShowPD ? (
        <ProductDetails
          modalShowPD={modalShowPD}
          productDetails={productDetails}
          setModalShowPD={setModalShowPD}
        />
      ) : null}
      {modalShowPU ? (
        <UpdateProductModal
          modalShowPU={modalShowPU}
          productDetails={productDetails}
          setModalShowPU={setModalShowPU}
          createCategoryList={createCategoryList}
        />
      ) : null}
    </Layout>
  );
};

export default Products;
