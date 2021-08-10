import logo from "../images/logo/icon-left-font.jpg";
import { Link } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "axios";

const HeaderMessage = () => {

  const Logout = () => {
    localStorage.clear()
    window.location.pathname="/signin"
  }

  const deleteProfil = () => {
    axios.delete("http://localhost:3001/api/users/delete", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(() => {
      localStorage.clear()
      alert('Utilisateur supprimé')
      document.location.reload()
    })
    .then(() => {
    })
    .catch((error) => {
      console.log(error)
    }) 
  }


  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <nav className="header__nav">
        <Link exact to="/profil" className="header__nav--link" color="secondary" onClick={deleteProfil}>
          Supprimez votre compte
        </Link>
        <Button
          className="header__nav--link"
          variant="contained"
          color="secondary"
          onClick={Logout}
        >
          Déconnection
        </Button>
      </nav>
    </div>
  );
};

export default HeaderMessage;
