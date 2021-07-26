import logo from "../images/logo/icon-left-font.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <a href="/" className="header__logo">
        <img src={logo} alt="logo" />
      </a>
      <nav className="header__nav">
          <NavLink exact to="/signin" className="header__nav--link" activeClassName="header__active">
                Se connecter
          </NavLink>
          <NavLink exact to="/" className="header__nav--link" activeClassName="header__active">
                S'inscrire
          </NavLink>
      </nav>
    </div>
  );
};

export default Header;
