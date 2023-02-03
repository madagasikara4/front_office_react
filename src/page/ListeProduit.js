import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import './Page.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.css'
import '../assets/css/flexslider.css'
import '../assets/css/icomoon.css'
import '../assets/css/owl.theme.default.min.css'
import HeaderNC from "./headernc";
import check from "../fonction/check";
import { useNavigate } from "react-router-dom";


function ListeProduit() {

  const navigate = useNavigate();

  function storage(idproduit) {
    localStorage.setItem("idproduit", idproduit);
    if (check() === false) {
      navigate("/login")
    }
    else {
      navigate("/detail")
    }
  }

  const [data, setData] = useState(Array);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: `https://webservice-production-6ef4.up.railway.app`
    })
    api.get("/produits/photo/statut")
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        setError(err)
        console.log(error)
      })
  }, [])

  var renderForm = (
    <div id="fh5co-started">
      <div className="container">
        <h2>Aucune enchere</h2>
      </div>
    </div>
  );

  var headerForm = (
    <div className="fh5co-started">
      <Header />
    </div>
  );
  if (check() === false) {
    headerForm = (
      <div className="fh5co-started">
        <HeaderNC />
      </div>
    );
  }

  if (data != null) {
    renderForm = (
      <div id="fh5co-started">
        <div className="container">
          {data.map((item) => (
            <div className="col-md-4 col-sm-4 text-center" key={item.idproduit}>
              <div className="feature-center animate-box" data-animate-effect="fadeIn">
                <span className="icon">
                  <img alt="" src={"data:image/*;base64," + item.image} />
                </span>
                <input type="hidden" name="id" value={item.idproduit} />
                <span className="price">Prix min : {item.prixmin}</span><br></br>
                <span className="description">Description : {item.descri} </span><br></br>
                <span className="categorie">Nom produit : {item.nomproduit}</span><br></br>
                <p><input className="btn btn-primary btn- btn-outline" type="submit" value="Voir détails" onClick={() => storage(item.idproduit)} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      {headerForm}
      {renderForm}
    </div>
  );
}
export default ListeProduit;