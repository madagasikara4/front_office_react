import Login from "../page/Login";
import { useNavigate } from "react-router-dom";

function Deconnexion() {
    const navigate=useNavigate();
    localStorage.removeItem("iduser")
    localStorage.removeItem("token")
    localStorage.clear()
    navigate("/login");
    return(
        <Login />
    )
}
export default Deconnexion;