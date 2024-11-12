import { FavoriteNewPage } from "./FavoriteNewPage";

export function AnimeShow({ currentAnime }) {
  return (
    <div className="anime-show-container">
      <div className="anime-details">
        <img src={currentAnime.image_url} alt={currentAnime.name} className="anime-image" />
        <div className="anime-description">
          <h1>{currentAnime.name}</h1>
          <p>{currentAnime.description}</p>
          <p>Category: {currentAnime.category}</p>
        </div>
      </div>
      <FavoriteNewPage animeId={currentAnime.id}/>
    </div>
  );
}