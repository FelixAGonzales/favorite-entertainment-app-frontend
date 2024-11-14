import { useEffect, useState } from "react";
import { LogoutLink } from "./LogoutLink";
import { Link } from "react-router-dom";
import axios from "axios";

export function Header() {

  const [currentUser, setCurrentUser] = useState({})
  const [isDropdownOpen, setIsDropdownOpen] = useState (false);

  const getUserData = () => {
    axios.get("http://localhost:3000/users/current.json").then(response => {
      setCurrentUser(response.data)
    });
  };

  useEffect(getUserData, []);


  let authenticationLinks;
  let user;
  if (localStorage.jwt === undefined ){
    authenticationLinks = (
      <>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> 
      </>
    );
  } else {
    authenticationLinks = <Link to="/Favorites">Favorites</Link>;
    user = (
      <div className="user-profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {currentUser.name}
        <img
          src={currentUser.image_url}
          alt="Profile"
          className="main-profile-pic"
        />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <LogoutLink />
          </div>
        )}
      </div>
    );
  }




  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/">Home</Link> | {authenticationLinks} | <Link to="/topanime">Top Anime</Link>
      </nav>
      <div className="user-info">
        {user}
      </div>
    </header>
  )
}