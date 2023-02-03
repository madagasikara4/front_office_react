import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function Recherche() {
    var idcategorie = 0;
    var prixMin = 0;
    var date = null;
    var statut = 0;
    var keyWord = "";

    const [categorieData, setCategorieData] = useState(Array);
    const navigate=useNavigate();

    useEffect(() => {
        const api = axios.create({
            baseURL: `https://webservice-production-6ef4.up.railway.app`
        })
        api.get("/categories")
            .then(res => {
                setCategorieData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        }, [])
        
    const handleSearch = () => {
        const formData = {
            "idcategorie": idcategorie,
            "prixMin": prixMin,
            "date": date,
            "statut": statut,
            "keyWord": keyWord
        }
        localStorage.setItem("formdata",JSON.stringify(formData));
        navigate("/search");
    }

    return (
        <div className="container">
            <nav className="fh5co-nav" role="navigation">
                <div className="row">
                    <div className="col-md-3 col-xs-2">
                        <div id="fh5co-logo">Recherche avancée</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <select name="idcategorie" onChange={(event) => idcategorie = parseInt(event.target.value)}>
                            <option>Catégorie</option>
                            {categorieData.map((item) => (
                                <option value={item.idcategorie}>{item.nomCategorie}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <input placeholder="prix" type="number " name="prixMin" min={0} onChange={(event) => prixMin = parseInt(event.target.value)} />
                    </div>
                    <div className="col-sm-2">
                        <input type="date" name="date" onChange={(event) => date = event.target.value} />
                    </div>
                    <div className="col-sm-2">
                        <select name="statut" onChange={(event) => statut = parseInt(event.target.value)}>
                            <option>Statut</option>
                            <option value="0">En cours</option>
                            <option value="1">Fini</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <input placeholder="Recherche..." type="text" name="keyWord" onChange={(event) => event.target.value} />
                    </div>
                    <div className="col-sm-2">
                        <input type="submit" onClick={handleSearch} className="btn btn-primary" value="Rechercher" />
                    </div>
                </div>
            </nav>
        </div>
        
    );
}
export default Recherche;