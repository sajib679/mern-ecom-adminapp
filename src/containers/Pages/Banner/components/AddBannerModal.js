import React from "react";
import Input from "../../../../components/UI/Input";
import AddBanModal from "../../../../components/UI/Modal";

const AddBannerModal = (props) => {
  const {
    show,
    onHide,
    buttonOnSave,
    bannerName,
    setBannerName,
    handleBannerImage,
  } = props;
  return (
    <AddBanModal
      show={show}
      onHide={onHide}
      buttonOnSave={buttonOnSave}
      heading="Create Banner"
      footerbutton="Save"
    >
      <Input
        label="Banner Name"
        type="text"
        placeholder={`Enter Banner Name`}
        value={bannerName}
        onChange={(e) => setBannerName(e.target.value)}
      />
      <hr />

      <Input label="Banner Image" type="file" onChange={handleBannerImage} />
    </AddBanModal>
  );
};

export default AddBannerModal;
