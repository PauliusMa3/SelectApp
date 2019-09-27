import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className='header'>
      <div className='header__navigation'>
        <NavLink className='header__navigation--link' activeClassName="selected" to="/single-select">Single Select</NavLink>
        <NavLink className='header__navigation--link' activeClassName="selected" to="/multi-select">Multi Select</NavLink>
      </div>
    </header>
  );
};

export default Header;
