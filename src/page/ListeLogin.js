import React from "react";
import './Page.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.css'
import '../assets/css/flexslider.css'
import '../assets/css/icomoon.css'
import '../assets/css/owl.theme.default.min.css'
import Login from "./Login";
import ListeProduit from "./ListeProduit";
import check from "../fonction/check";

function ListeLogin() {

    var loginForm = (
        <div className="fh5co-started">
          <Login />
        </div>
      );
      if (check()) {
        loginForm = (
          <div className="fh5co-started">
            <ListeProduit />
          </div>
        );
      }

  return (
    <div className="container">
      {loginForm}
    </div>
  );
}
export default ListeLogin;