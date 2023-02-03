import axios from "axios";

function check() {
  if (localStorage.getItem('token') == null) {
    return false
  }
  if (localStorage.getItem('iduser') == null) {
    return false
  }

  var token = localStorage.getItem('token');
  var idUser = localStorage.getItem('iduser');

  if (token === 'undefined')
    return false
  if (idUser === 'undefined')
    return false

  
    const api = axios.create({
      baseURL: `https://webservice-production-6ef4.up.railway.app`
    })
    api.get("/users/" + token + "/validation")
      .then(res => {
        if(!res.data.data)
          return false
        if(res.data.data)
          return true
      })
      .catch(err => {
        return false
      })
}

export default check;