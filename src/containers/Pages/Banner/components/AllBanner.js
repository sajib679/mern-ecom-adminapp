import React from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { imageUrl } from "../../../../urlConfig";
const AllBanner = ({ banners }) => {
  return (
    <Container>
      {banners.map((banner) => {
        return (
          <Row key={banner._id} className="d-block border border-gray">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>{banner.name}</th>
                </tr>
              </thead>
            </table>
            <Row>
              {banner.bannerImages.map((picture) => (
                <Col sm={2} key={picture._id}>
                  <div className="img-container">
                    <img key={picture._id} src={imageUrl(picture.img)}></img>
                  </div>
                </Col>
              ))}
            </Row>
          </Row>
        );
      })}
    </Container>
  );
};

export default AllBanner;
