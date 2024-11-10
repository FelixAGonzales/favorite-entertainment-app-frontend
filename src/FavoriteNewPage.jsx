import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function FavoriteNewPage( {animeId}) {

  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate();

  const getUserData = () => {
    // console.log("get user data");
    axios.get("http://localhost:3000/users/current.json").then(response => {
      // console.log(response.data)
      setCurrentUser(response.data)
    })
  }

  useEffect(getUserData, [])



  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handling submit favorite')
    // const params = new FormData(event.target)
    const params = {user_id: currentUser.id, item_id: animeId}
    console.log(params);
    axios.post("http://localhost:3000/favorites.json", params).then(response => {
      console.log(response.data)
      // window.location.href = "/"
      navigate('/');
      
    })
  }



  return (
    <div>
      <button onClick={handleSubmit}>Add to favorites</button>
    </div>
  );
}