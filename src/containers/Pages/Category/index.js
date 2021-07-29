import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories,
} from "../../../actions/index";
import Layout from "../../../components/Layout";
import AddCategoryModal from "./components/AddCategoryModal";
import UpdateCategoryModal from "./components/UpdateCategoryModal";

import CheckboxTree from "react-checkbox-tree";
import "../../../../node_modules/react-checkbox-tree/lib/react-checkbox-tree.css";
import { Col, Row } from "react-bootstrap";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import {
  FaCheckCircle,
  FaCircle,
  FaAngleRight,
  FaAngleDown,
} from "react-icons/fa";
import createCategoryList from "../../../helpers/CategoryList";

const Category = (props) => {
  const initialState = "";
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState(initialState);
  const [categoryImage, setCategoryImage] = useState(initialState);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderNestedCategories = (cat) => {
    let categories = [];
    for (const category of cat) {
      categories.push({
        label: category.name,
        value: category._id,

        children:
          category.children.length > 0 &&
          renderNestedCategories(category.children),
      });
    }
    return categories;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };
  const deleteCategory = () => {
    setDeleteCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });

    setCheckedArray(checkedArray);
  };

  const addCategoryForm = () => {
    const form = new FormData();
    const category = {
      name: categoryName,
      parentId: parentCategoryId,
      categoryImage: categoryImage,
    };

    form.append("name", category.name);
    form.append("parentId", category.parentId);
    form.append("categoryImage", category.categoryImage);
    dispatch(addCategory(form));
    setAddCategoryModal(false);
  };
  const updateCategoryForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form)).then((updatedCategory) => {
      if (updateCategory) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);
  };
  const deleteCategoryForm = () => {
    const ids = checkedArray.map((item) => ({
      _id: item.value,
    }));

    dispatch(deleteCategories(ids)).then((updatedCategory) => {
      if (updateCategory) {
        dispatch(getAllCategory());
      }
    });

    setDeleteCategoryModal(false);
  };

  return (
    <Layout
      sidebar
      button
      name="Category"
      buttonAdd="Create"
      buttonEdit="Update"
      buttonDelete="Delete"
      addOnClick={() => setAddCategoryModal(true)}
      editOnClick={updateCategory}
      deleteOnClick={deleteCategory}
    >
      <Row>
        <Col>
          <CheckboxTree
            nodes={renderNestedCategories(category.categories)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            icons={{
              check: <FaCheckCircle style={{ color: "green" }} />,
              uncheck: <FaCircle style={{ color: "green" }} />,
              halfCheck: <FaCheckCircle />,
              expandClose: <FaAngleRight />,
              expandOpen: <FaAngleDown />,
              expandAll: <FaAngleRight />,
              collapseAll: <FaAngleDown />,
              parentClose: null,
              parentOpen: null,
              leaf: null,
            }}
          />
        </Col>
      </Row>

      <AddCategoryModal
        show={addCategoryModal}
        onHide={() => setAddCategoryModal(false)}
        buttonOnSave={addCategoryForm}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={createCategoryList(category.categories)}
        handleCategoryImage={handleCategoryImage}
      ></AddCategoryModal>

      <UpdateCategoryModal
        show={updateCategoryModal}
        onHide={() => setUpdateCategoryModal(false)}
        buttonOnSave={updateCategoryForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={createCategoryList(category.categories)}
        handleCategoryImage={handleCategoryImage}
      ></UpdateCategoryModal>

      <DeleteCategoryModal
        show={deleteCategoryModal}
        onHide={() => setDeleteCategoryModal(false)}
        buttonOnSave={deleteCategoryForm}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={createCategoryList(category.categories)}
      ></DeleteCategoryModal>
    </Layout>
  );
};

export default Category;
