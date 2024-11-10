import { FavoriteNewPage } from "./FavoriteNewPage";

export function AnimeShow({ currentAnime }) {
  return (
    <div>
      <div>
        <h1>{currentAnime.name}</h1>
        <img src={currentAnime.image_url} alt={currentAnime.name} />
        <p>{currentAnime.description}</p>
        <p>Category: {currentAnime.category}</p>
      </div>
      <FavoriteNewPage animeId={currentAnime.id}/>
    </div>
  );
}