import React from "react";
import axios from "axios";
import "./Style.css";
import { useNavigate } from "react-router-dom";

function setToken(iduser, tokenvalue) {
  localStorage.setItem("iduser", iduser);
  localStorage.setItem("token", tokenvalue);
}

function Login() {
  const navigate = useNavigate();
  var user = "Rasoa";
  var mdp = "rasoa";

  const handleLogin = () => {
    console.log("IS SUBMITTED")
    const formData = {
      "nomuser": user,
      "mdp": mdp
    }
    var data = null
    const api = axios.create({
      baseURL: `https://webservice-production-6ef4.up.railway.app`
    })

    api.post("/users/login", formData)
      .then(res => {
        data = res.data.data
        setToken(data.iduser, data.token)
        navigate("/prod");
        //window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
      
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="input-container">
        <label>Nom d'utilisateur</label>
        <input defaultValue="Rasoa" type="text" name="uname" onChange={(event) => user = event.target.value} required />
      </div>
      <div className="input-container">
        <label>Mot de passe</label>
        <input defaultValue="rasoa" type="password" name="pass" onChange={(event) => mdp = event.target.value} required />
      </div>
      <div className="button-container">
        <input type="submit" onClick={handleLogin} value="Se connecter" />
      </div>
    </div>
  );

  return (
    <div className="container">
      <nav className="fh5co-nav" role="navigation">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-xs-2">
              <div id="fh5co-logo">Enchere</div>
            </div>
            <div className="col-md-6 col-xs-6 text-center menu-1">
              <ul>
                <li><a href="/">Voir Liste des produits</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="Login">
        <div className="login-form">
          <div className="title">Enchere connexion</div>
          {renderForm}
        </div>
      </div>
    </div>
  );
}

export default Login;