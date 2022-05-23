import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "1064237052094-3sogiulgc9cdh0chu373g10018tgs184.apps.googleusercontent.com";
/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const NavBar = (props) => {
    return (
        <nav className="NavBar-container">
      <div className="logo-image">
      </div>
            <div className="NavBar-title u-inlineBlock">WordTree</div>
            <div className="NavBar-linkContainer u-inlineBlock">
            {props.userId && ( 
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
           Profile
          </Link>
         )}
            <Link to="/" className="NavBar-link">
          Explore
        </Link>
        <Link to="/saved/" className="NavBar-link">
          Saved
        </Link>
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
        </div>
        </nav>
    );
};

export default NavBar;