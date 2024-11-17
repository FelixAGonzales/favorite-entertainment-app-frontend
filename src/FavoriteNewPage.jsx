import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function FavoriteNewPage( {animeId}) {

  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate();

  const getUserData = () => {
    axios.get("http://localhost:3000/users/current.json").then(response => {
      setCurrentUser(response.data)
    })
  }

  useEffect(getUserData, [])



  const handleSubmit = (event) => {
    event.preventDefault()
    const params = {user_id: currentUser.id, item_id: animeId}
    axios.post("http://localhost:3000/favorites.json", params).then(response => {
      console.log(response.data)
      navigate('/');
      
    })
  }



  return (
    <div>
      <button onClick={handleSubmit}>Add to favorites</button>
    </div>
  );
}