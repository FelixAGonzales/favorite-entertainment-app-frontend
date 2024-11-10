import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Modal } from "./Modal";
import { FavoriteShow } from "./FavoriteShow";

export function AnimesIndexPage() {
  const animes = useLoaderData();
  const [searchFilter, setSearchFilter] = useState("");
  const [currentFavorite, setCurrentFavorite] = useState({});
  const [isFavoriteShowVisible, setIsFavoriteShowVisible] = useState(false);

  const handleShow = (anime) => {
      setIsFavoriteShowVisible(true);
      setCurrentFavorite(anime);
    };
    
    const handleClose = () => {
      setIsFavoriteShowVisible(false);
    };


  return (
    <div>
      <h1>Anime List</h1>
      <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)}/>
      <div className="posts-container">
      {animes.filter((animes) => animes.name.toLowerCase().includes(searchFilter.toLowerCase())).map(animes => (
        <div key={animes.id} className="animes">
          <h2>{animes.name}</h2>
          <img src={animes.image_url} alt="" />
          <p> {animes.description}</p>
          <p>Category: {animes.category}</p>
          <button type="button" onClick={() => handleShow(animes)}> More Info </button>
        </div>
      ))}
      </div> 


      <Modal show={isFavoriteShowVisible} onClose={handleClose}>
        <FavoriteShow currentFavorite={currentFavorite}/>
      </Modal>
    </div>
  );
}