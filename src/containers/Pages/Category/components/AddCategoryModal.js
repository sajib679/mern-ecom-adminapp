import React from "react";
import Input from "../../../../components/UI/Input";
import AddCatModal from "../../../../components/UI/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    onHide,
    buttonOnSave,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <AddCatModal
      show={show}
      onHide={onHide}
      buttonOnSave={buttonOnSave}
      heading="Create Category"
      footerbutton="Save"
    >
      <Input
        label="Category Name"
        type="text"
        placeholder={`Enter Category Name`}
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <label htmlFor="select">Parent Category</label>
      <select
        className="form-control"
        value={parentCategoryId}
        onChange={(e) => setParentCategoryId(e.target.value)}
      >
        <option value="">None</option>
        {categoryList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <hr />

      <Input
        label="Category Image"
        type="file"
        onChange={handleCategoryImage}
      />
    </AddCatModal>
  );
};

export default AddCategoryModal;
