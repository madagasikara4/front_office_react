import React from "react";
import axios from "axios";
import "./Style.css";
import { useState } from "react";
import { format } from 'date-fns'

function ListeRecherche() {

    const formData = JSON.parse(localStorage.getItem("formdata"));

    const [data, setData] = useState(Array);
    const api = axios.create({
        baseURL: `https://webservice-production-6ef4.up.railway.app`
    })

    api.post("/recherche", formData)
        .then(res => {
            setData(res.data.data)
            console.log("data length " + data.length)
            if (data.length === 0) {
                console.log("data null")
            }
        })
        .catch(err => {
            console.log(err)
        })

    return (
        <div className="container">
            <div className="fh5co-started">
                <nav className="fh5co-nav" role="navigation">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-xs-2">
                                <div id="fh5co-logo">Enchere</div>
                            </div>
                            <div className="col-md-6 col-xs-6 text-center menu-1">
                                <h2>Résultat recherche</h2>
                            </div>
                            <div className="col-md-3 col-xs-2">
                                <ul>
                                    <li><a href="/">Accueil</a></li>
                                    <li><a href="/recherche">Recherche</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="fh5co-started">
                <div className="container">
                    {data.map((it) => (
                        <div className="col-md-4 col-sm-4 text-center">
                            <div className="feature-center animate-box" data-animate-effect="fadeIn">
                                <span className="price">Prix min : {it.prixmin} Ariary</span><br></br>
                                <span className="price">Prix enchere : {it.prixenchere} Ariary</span><br></br>
                                <span className="description">Description : {it.descri} </span><br></br>
                                <span className="categorie">Nom produit : {it.nomproduit}</span><br></br>
                                <span className="categorie">Categorie : {it.nomcategorie}</span><br></br>
                                <span className="date">Debut : {format(new Date(it.debut), 'dd/MM/yyy hh:mm:ss')}</span><br></br>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListeRecherche;