import logo from "../images/logo/icon-left-font.jpg";
import { Link } from "@material-ui/core";
import { Button } from "@material-ui/core";

const HeaderMessage = () => {

  const Logout = () => {
    localStorage.clear()
    window.location.pathname="/signin"
  }
  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <nav className="header__nav">
        <Link exact to="/profil" className="header__nav--link" color="secondary">
          Profil
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
