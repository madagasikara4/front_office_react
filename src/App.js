import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListeProduit from './page/ListeProduit';
import ListeLogin from './page/ListeLogin';
import Deconnexion from './fonction/deconnexion';
import Recherche from './page/Recherche';
import ListeRecherche from './page/ListeRecherche';
import FicheProduit from './page/Fiche';
import MesEncheres from './page/MesEncheres';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListeProduit />} />
        <Route path="/prod" element={<ListeProduit />} />
        <Route path="/login" element={<ListeLogin />} />
        <Route path="/deconnexion" element={<Deconnexion />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/search" element={<ListeRecherche />} />
        <Route path='/detail' element={<FicheProduit />} />
        <Route path='/mesencheres' element={<MesEncheres />} />
      </Routes>
    </Router>
  );
}

export default App;
