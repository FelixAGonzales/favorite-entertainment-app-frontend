import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FavoriteShow } from "./FavoriteShow";

export function FavoriteIndexPage() {
  const initialfavorites = useLoaderData();
  const [searchFilter, setSearchFilter] = useState("");
  const [animes, setFavorite] = useState(initialfavorites);
  const [currentFavorite, setCurrentFavorite] = useState({});
  const [isFavoriteShowVisible, setIsFavoriteShowVisible] = useState(false);

  const fetchFavorites = () => {
    axios.get("http://localhost:3000/favorites.json").then((response) => {
      setFavorite(response.data);
    });
  };

  const handleShow = (favorite) => {
    setIsFavoriteShowVisible(true);
    setCurrentFavorite(favorite);
  };
    
  const handleClose = () => {
    setIsFavoriteShowVisible(false);
  };

  const handleFavoriteDestroy = (favoriteId) => {
    axios.delete(`http://localhost:3000/favorites/${favoriteId}.json`).then(() => {
      fetchFavorites();
    });
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <div className="centered-content">
        <h1>My Favorite Anime List</h1>
        <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)}/>
      </div>
      <div className="posts-container">
      {animes.filter((favorite) => favorite.item.name.toLowerCase().includes(searchFilter.toLowerCase())).map(favorite => (
        <div key={favorite.id} className="favorites">
          <h2>{favorite.item.name}</h2>
          <img src={favorite.item.image_url} alt="" />
          <p> {favorite.item.description}</p>
          <p>Category: {favorite.item.category}</p>
          <button type="button" onClick={() => handleShow(favorite)}> More Info </button>
          <br />
          <br />
          <button onClick={() => handleFavoriteDestroy(favorite.id)}>Remove From Favorites</button>
        </div>
      ))}
      </div>


      <Modal show={isFavoriteShowVisible} onClose={handleClose}>
        <FavoriteShow currentFavorite={currentFavorite}/>
      </Modal>
    </div>
  );
}