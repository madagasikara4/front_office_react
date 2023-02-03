import React from "react";

import './Page.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.css'
import '../assets/css/flexslider.css'
import '../assets/css/icomoon.css'
import '../assets/css/owl.theme.default.min.css'

function HeaderNC() {
    const renderForm = (
        <nav className="fh5co-nav" role="navigation">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-xs-2">
                        <div id="fh5co-logo">Enchere</div>
                    </div>
                    <div className="col-md-6 col-xs-6 text-center menu-1">
                        <ul>
                            <li><a href="/login">Se connecter</a></li>
                            <li><a href="/recherche">Recherche</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
    return (
        <div className="fh5co-nav">
            {renderForm}
        </div>
    );
}
export default HeaderNC;