import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import Header from "./header";
import './Page.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.css'
import '../assets/css/flexslider.css'
import '../assets/css/icomoon.css'
import '../assets/css/owl.theme.default.min.css'
import HeaderNC from "./headernc";
import check from "../fonction/check";

function FicheProduit() {

  const idproduit = localStorage.getItem('idproduit');
  const navigate = useNavigate();

  const [data, setData] = useState(Array);
  const [max, setMax] = useState(Array);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: `https://webservice-production-6ef4.up.railway.app`
    })
    api.get("produits/" + idproduit + "/photo")
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        setError(err)
      })
  }, []);

  useEffect(() => {
    const api = axios.create({
      baseURL: `https://webservice-production-6ef4.up.railway.app`
    })
    api.get("prixMax/" + idproduit)
      .then(res => {
        setMax(res.data.data)
      })
      .catch(err => {
        setError(err)
      })
  }, []);

  var renderForm = (
    <div id="fh5co-started">
      <div className="container">
        <h2>Aucune enchere</h2>
      </div>
    </div>
  );

  var headerForm = (
    <div className="fh5co-started">
      <HeaderNC />
    </div>
  );
  if (check()) {
    headerForm = (
      <div className="fh5co-started">
        <Header />
      </div>
    );
  }
  var idu = JSON.parse(localStorage.getItem("iduser"));
  var pr ;

  const handleEncherir = () => {
    
    const formData = {
      "idproduit": JSON.parse(idproduit),
      "idutilisateur": idu,
      "prix": pr
    }
    const api = axios.create({
      baseURL: `https://webservice-production-6ef4.up.railway.app`
    })

    api.post("/encheres/encherir", formData)
      .then(res => {
        if(res.data.data===true){
          alert("Enchere Ajouté")
        }
        else{
          alert("Enchere invalide")
        }
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })

    navigate("/detail")
    
    }

  if (data != null && max != null) {
    pr = parseInt(max.prix + 1)
    renderForm = (
      <div id="fh5co-started">
        <div className="container">
          <div className="col-md-4 col-sm-4 text-center">
          </div>
          <div className="col-md-4 col-sm-4 text-center">
            <div className="feature-center animate-box" data-animate-effect="fadeIn">
              <span className="icon">
                <img alt="" src={"data:image/*;base64," + data.image} />
              </span>
              <span className="categorie">Nom produit : {data.nomproduit}</span><br></br>
              <input type="hidden" name="id" value={data.idproduit} />
              <span className="price">Prix min : {data.prixmin} Ariary</span><br></br>
              <span className="price">Prix max : {max.prix} Ariary</span><br></br>
              <span className="description">Description : {data.descri} </span><br></br>
              <p><input type="number" name="prix" onChange={(event) => pr = parseInt(event.target.value)} /></p>
              <p><input className="btn btn-primary btn- btn-outline" onClick={() => handleEncherir()} type="submit" value="Encherir" /></p>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 text-center">
          </div>

        </div>
      </div>
    )
  }

  if (data != null && max == null) {
    pr = 1;
    renderForm = (
      <div id="fh5co-started">
        <div className="container">
          <div className="col-md-4 col-sm-4 text-center">
          </div>
          <div className="col-md-4 col-sm-4 text-center">
            <div className="feature-center animate-box" data-animate-effect="fadeIn">
              <span className="icon">
                <img alt="" src={"data:image/*;base64," + data.image} />
              </span>
              <span className="categorie">Nom produit : {data.nomproduit}</span><br></br>
              <input type="hidden" name="id" value={data.idproduit} />
              <span className="price">Prix min : {data.prixmin}</span><br></br>
              <span className="price">Prix max : pas encore de mise</span><br></br>
              <span className="description">Description : {data.descri} </span><br></br>
              <p><input type="number" name="prix" defaultValue={data.prixmin} min={data.prixmin} onChange={(event) => pr = parseInt(event.target.value)} /></p>
              <p><input className="btn btn-primary btn- btn-outline" onClick={() => handleEncherir()} type="submit" value="Encherir" /></p>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 text-center">
          </div>

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


export default FicheProduit;