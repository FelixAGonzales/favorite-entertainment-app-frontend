import { useState, useEffect } from "react";
import axios from "axios";

export function ProfilePage() {

  const [currentUser, setCurrentUser] = useState({})


  const getUserData = () => {
    // console.log("get user data");
    axios.get("http://localhost:3000/users/current.json").then(response => {
      console.log(response.data)
      setCurrentUser(response.data)
    })
  }

  useEffect(getUserData, [])



  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={currentUser.image_url}
          alt={`${currentUser.name}'s profile`}
          className="profile-pic"
        />
        <h1 className="profile-name">{currentUser.name}</h1>
      </div>
      
      <div className="profile-buttons">
        <button className="profile-button">Friends</button>
        <button className="profile-button">Favorite Anime</button>
      </div>
    </div>
  );
}