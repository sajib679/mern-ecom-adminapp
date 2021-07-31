import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/HOC/PrivateRoutes";
import SignIn from "./containers/Pages/SignIn/index";
import SignUp from "./containers/Pages/SignUp/index";
import Home from "./containers/Pages/Home/index";
import { getInitialData, isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Products from "./containers/Pages/Products";
import Orders from "./containers/Pages/Orders";
import Category from "./containers/Pages/Category";
import Page from "./containers/Pages/Page";
import Banner from "./containers/Pages/Banner";

function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home}></PrivateRoute>
        <PrivateRoute path="/products" component={Products}></PrivateRoute>
        <PrivateRoute path="/page" component={Page}></PrivateRoute>
        <PrivateRoute path="/orders" component={Orders}></PrivateRoute>
        <PrivateRoute path="/category" component={Category}></PrivateRoute>
        <PrivateRoute path="/banner" component={Banner}></PrivateRoute>

        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Switch>
    </div>
  );
}

export default App;
