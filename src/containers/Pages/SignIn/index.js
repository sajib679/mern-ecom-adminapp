import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../../components/Layout/index";
import Input from "../../../components/UI/Input/index";
import { login } from "../../../actions/index";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const SignIn = () => {
  const initialState = "";
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState(initialState);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Row style={{ marginTop: 50 }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={userLogin}>
            <Input
              label="Email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default SignIn;
