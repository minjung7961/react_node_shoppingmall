import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import alcolAuth from"../hoc/alcolAuth.js"
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import AlcolLoginPage from "./views/LoginPage/AlcolLoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage.js";
import DetailAlcoholeProductPage from "./views/DetailAlcoholeProductPage/DetailAlcoholeProductPage.js";
import CartPage from './views/CartPage/CartPage.js'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={alcolAuth(LandingPage, true)} />
          <Route exact path="/login" component={alcolAuth(LoginPage, false)} />
          <Route exact path="/alcolLogin" component={alcolAuth(AlcolLoginPage,false)} />
          <Route exact path="/register" component={alcolAuth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={alcolAuth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={alcolAuth(DetailProductPage, true)} /> 
          <Route exact path="/product/alc/:productId" component={alcolAuth(DetailAlcoholeProductPage, true)} /> 
          <Route exact path="/user/cart" component={alcolAuth(CartPage, true)} />
        
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
