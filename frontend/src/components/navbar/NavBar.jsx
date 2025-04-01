import React, { useContext } from 'react';
import { FaShoppingCart, FaPlus, FaSun, FaMoon } from 'react-icons/fa';
import ThemeContext from '../../context/Themecontext';
import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = ({ onCreate }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__left">
        <h1 className="navbar__title">
          <FaShoppingCart className="navbar__icon" /> Product Store
        </h1>
      </Link>

      <div className="navbar__right">
        <Link
          to="/create"
          className="navbar__btn"
          onClick={onCreate}
          title="Create New"
        >
          <FaPlus />
        </Link>
        <button
          className="navbar__btn"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
