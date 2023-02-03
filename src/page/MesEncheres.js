import Header from "./header";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import './Page.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.css'
import '../assets/css/flexslider.css'
import '../assets/css/icomoon.css'
import '../assets/css/owl.theme.default.min.css'

function MesEncheres() {

    const idproduit = localStorage.getItem('iduser');

    const [data, setData] = useState(Array);
    const [error, setError] = useState(null);

    useEffect(() => {
        const api = axios.create({
            baseURL: `https://webservice-production-6ef4.up.railway.app`
        })
        api.get("/encheres/byuser/" + idproduit)
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                setError(err)
            })
    }, [])

    const renderForm = (
        <div className="fh5co-started">
            <div className="row">
                <table className="table">
                    <thead>
                        <th>Produit</th>
                        <th>Mise</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.nomproduit}</td>
                                <td>{item.prix} Ariary</td>
                                <td>{format(new Date(item.datemise), 'dd/MM/yyy hh:mm:ss')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    return (
        <div className="container">
            <div className="fh5co-started">
                <Header />
            </div>
            {renderForm}
        </div>

    )
}
export default MesEncheres;