import React from "react";
import { Link } from "react-router-dom";
import "./AuthNav.css";

const AuthNav = ({ text, button, path }) => {
  return (
    <>
      <div className="auth-nav">
        <p className="auth-nav__text">{text}</p>
        <Link className="auth-nav__button link" to={path}>
          {button}
        </Link>
      </div>
    </>
  );
};

export default AuthNav;
