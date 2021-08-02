import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPage } from "../../../actions/page.action";
import Layout from "../../../components/Layout";
import createCategoryList from "../../../helpers/CategoryList";
import CreatePageModal from "./components/CreatePageModal";
import PageList from "../../../components/UI/Table";
import PageDetails from "./components/PageDetails";
import PageUpdate from "./components/PageUpdate";
const Page = () => {
  useEffect(() => {
    dispatch(getAllPage());
  }, []);

  const [createPageModal, setCreatePageModal] = useState(false);
  const [modalShowPD, setModalShowPD] = useState(false);
  const [modalShowPU, setModalShowPU] = useState(false);
  const [pageDetails, setPageDetails] = useState({});

  const pages = useSelector((state) => state.page.pages);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const categoryList = createCategoryList(category.categories);

  const showPageDetails = (pageDetails) => {
    setPageDetails(pageDetails);
    setModalShowPD(true);
  };

  const showPageUpModal = (pageDetails) => {
    setPageDetails(pageDetails);
    setModalShowPU(true);
  };

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
        categoryList={categoryList}
      ></CreatePageModal>
      <PageList
        tableHeadRow={
          pages.length > 0 && (
            <tr>
              <th>#</th>
              <th>Page Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          )
        }
      >
        {pages.length > 0 &&
          pages.map((page, index) => (
            <tr key={page._id}>
              <td>{index + 1}</td>
              <td>{page.pageTitle}</td>
              <td>{page.category.name}</td>
              <td>{page.description} </td>
              <td>
                <Row className="justify-content-md-around m-auto ">
                  <Button
                    className="mb-sm-1 mb-lg-0"
                    size="sm"
                    variant="outline-info"
                    onClick={() => showPageDetails(page)}
                  >
                    Details
                  </Button>
                  <Button
                    className="mt-sm-1 mt-lg-0"
                    size="sm"
                    variant="outline-warning"
                    onClick={() => showPageUpModal(page)}
                  >
                    Edit
                  </Button>
                </Row>
              </td>
            </tr>
          ))}
      </PageList>
      {modalShowPD && (
        <PageDetails
          modalShowPD={modalShowPD}
          setModalShowPD={setModalShowPD}
          pageDetails={pageDetails}
        />
      )}

      {modalShowPU && (
        <PageUpdate
          modalShowPU={modalShowPU}
          setModalShowPU={setModalShowPU}
          categoryList={categoryList}
          pageDetails={pageDetails}
        />
      )}
    </Layout>
  );
};

export default Page;
