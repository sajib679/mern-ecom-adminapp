import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBanner, getAllBanner } from "../../../actions";
import Layout from "../../../components/Layout";
import AddBannerModal from "./components/AddBannerModal";
import AllBanner from "./components/AllBanner";

const Banner = (props) => {
  const initialState = "";
  const [addBannerModal, setAddBannerModal] = useState(false);
  const [bannerName, setBannerName] = useState("");
  const [bannerImage, setBannerImage] = useState(initialState);
  const banners = useSelector((state) => state.banner.banners);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBanner());
  }, []);

  const handleBannerImage = (e) => {
    const allImg = [...e.target.files];
    setBannerImage(allImg);
  };

  const addBannerForm = () => {
    const form = new FormData();
    form.append("name", bannerName);
    for (const picture of bannerImage) {
      form.append("bannerImages", picture);
    }
    dispatch(createBanner(form));
    setAddBannerModal(false);
  };

  return (
    <Layout
      sidebar
      button
      name="Banner"
      buttonAdd="Create"
      buttonEdit="Update"
      buttonDelete="Delete"
      addOnClick={() => setAddBannerModal(true)}
      // editOnClick={updateBanner}
      // deleteOnClick={deleteBanner}
    >
      <AddBannerModal
        show={addBannerModal}
        onHide={() => setAddBannerModal(false)}
        buttonOnSave={addBannerForm}
        bannerName={bannerName}
        setBannerName={setBannerName}
        handleBannerImage={handleBannerImage}
      ></AddBannerModal>

      <AllBanner banners={banners} />
    </Layout>
  );
};

export default Banner;
