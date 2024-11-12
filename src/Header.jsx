import { useEffect, useState } from "react";
import { LogoutLink } from "./LogoutLink";
import { Link } from "react-router-dom";
import axios from "axios";

export function Header() {

  const [currentUser, setCurrentUser] = useState({})

  const getUserData = () => {
    // console.log("get user data");
    axios.get("http://localhost:3000/users/current.json").then(response => {
      // console.log(response.data)
      setCurrentUser(response.data)
    })
  }

  useEffect(getUserData, [])



  let authenticationLinks;
  let user;
  if (localStorage.jwt === undefined ){
    authenticationLinks = (
      <>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>  
      </>
    )
  } else {
    authenticationLinks = (
      <>
      <Link to="/Favorites">Favorites</Link> | <LogoutLink />
      </>
   )
   user = <> Welcome, {currentUser.name}!</>
    // console.log("I am logged in")
  }




  return (
    <header>
      <nav>
      <Link to="/">Home</Link> | {authenticationLinks} |  {user}
      </nav>
    </header>
  )
}