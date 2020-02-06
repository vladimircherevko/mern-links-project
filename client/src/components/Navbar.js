import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auht = useContext(AuthContext);
  const logoutHandle = e => {
    e.preventDefault();
    auht.logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1 ph-2">
        <span className="brand-logo">Сокращение ссылок</span>
        <ul className="right">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandle}>
              Exit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
