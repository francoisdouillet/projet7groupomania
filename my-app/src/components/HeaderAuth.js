import logo from "../images/logo/icon-left-font.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo"> 
      <img src={logo} alt="logo" />
      </div>
      <nav className="header__nav">
          <NavLink exact to="/signin" className="header__nav--link" activeClassName="header__active">
                Se connecter
          </NavLink>
          <NavLink exact to="/signup" className="header__nav--link" activeClassName="header__active">
                S'inscrire
          </NavLink>
      </nav>
    </div>
  );
};

export default Header;
