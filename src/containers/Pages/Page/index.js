import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage, getAllPage } from "../../../actions/page.action";
import Layout from "../../../components/Layout";
import Input from "../../../components/UI/Input";
import createCategoryList from "../../../helpers/CategoryList";
import CreatePageModal from "./components/CreatePageModal";
import PageList from "../../../components/UI/Table";

const Page = () => {
  useEffect(() => {
    dispatch(getAllPage());
  }, []);

  const pages = useSelector((state) => state.page.pages);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const initialState = "";
  const [createPageModal, setCreatePageModal] = useState(false);
  const [pageTitle, setPageTitle] = useState(initialState);
  const [categoryId, setCategoryId] = useState(initialState);
  const [description, setDescription] = useState(initialState);
  const [bannersImage, setBannersImage] = useState([]);
  const [productsImage, setProductsImage] = useState([]);
  const categoryList = createCategoryList(category.categories);

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
    var newFileList = Array.from(e.target.files);
    setBannersImage([...bannersImage, ...newFileList]);
  };

  const handleProductImage = (e) => {
    setProductsImage([...productsImage, ...e.target.files]);
  };

  const showPageDetails = (params) => {};

  return (
    <Layout
      sidebar
      name="Page"
      button
      buttonAdd="Create"
      addOnClick={() => setCreatePageModal(true)}
    >
      <CreatePageModal
        createPageModal={createPageModal}
        setCreatePageModal={setCreatePageModal}
        createPageForm={createPageForm}
        pageTitle={pageTitle}
        setPageTitle={setPageTitle}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categoryList={categoryList}
        description={description}
        setDescription={setDescription}
        handleBannerImage={handleBannerImage}
        bannersImage={bannersImage}
        handleProductImage={handleProductImage}
        productsImage={productsImage}
        setBannersImage={setBannersImage}
      ></CreatePageModal>
      <PageList
        tableHeadRow={
          pages.length > 0 && (
            <tr>
              <th>#</th>
              <th>Page Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Banner Image</th>
            </tr>
          )
        }
      >
        {pages.length > 0 &&
          pages.map((page, index) => (
            <tr key={page._id} onClick={() => showPageDetails(page)}>
              <td>{index + 1}</td>
              <td>{page.pageTitle}</td>
              <td>{page.category.name}</td>
              <td>{page.description} </td>
              <td></td>
            </tr>
          ))}
      </PageList>
    </Layout>
  );
};

export default Page;
