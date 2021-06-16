import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../../actions";
import Layout from "../../../components/Layout/index";
import Input from "../../../components/UI/Input/index";

const SignUp = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const initialState = "";
  const [firstName, setfirstName] = useState(initialState);
  const [lastName, setlastName] = useState(initialState);
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState(initialState);
  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  if (user.loading) {
    return (
      <div>
        <>
          <Spinner animation="grow" />
          <Spinner animation="border" variant="primary" />
          <Spinner animation="border" variant="secondary" />
          <Spinner animation="border" variant="success" />
          <Spinner animation="border" variant="danger" />
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="info" />
          <Spinner animation="border" variant="light" />
          <Spinner animation="border" variant="dark" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </>
      </div>
    );
  }

  if (user.succes) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <Layout>
      <Row style={{ marginTop: 50 }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={userSignup}>
            <Row>
              <Col md={6}>
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => {
                    setfirstName(e.target.value);
                  }}
                />
              </Col>
              <Col md={6}>
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Input
              label="Email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default SignUp;
