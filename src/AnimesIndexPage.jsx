import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Modal } from "./Modal";
import { AnimeShow } from "./AnimeShow";

export function AnimesIndexPage() {
  const animes = useLoaderData();
  const [searchFilter, setSearchFilter] = useState("");
  const [currentAnime, setCurrentAnime] = useState({});
  const [isAnimeShowVisible, setIsAnimeShowVisible] = useState(false);

  const handleShow = (anime) => {
      setIsAnimeShowVisible(true);
      setCurrentAnime(anime);
    };
    
    const handleClose = () => {
      setIsAnimeShowVisible(false);
    };


  return (
    <div>
      <div className="centered-content">
        <h1>Anime List</h1>
        <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)}/>
      </div>
      <div className="posts-container">
      {animes.filter((animes) => animes.name.toLowerCase().includes(searchFilter.toLowerCase())).map(animes => (
        <div key={animes.id} className="animes">
          <h2>{animes.name}</h2>
          <img src={animes.image_url} alt="" />
          {/* <p> {animes.description}</p> */}
          <p>Category: {animes.category}</p>
          <button type="button" onClick={() => handleShow(animes)}> More Info </button>
        </div>
      ))}
      </div> 


      <Modal show={isAnimeShowVisible} onClose={handleClose}>
        <AnimeShow currentAnime={currentAnime}/>
      </Modal>
    </div>
  );
}