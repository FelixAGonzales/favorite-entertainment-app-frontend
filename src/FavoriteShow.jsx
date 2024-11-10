export function FavoriteShow({ currentFavorite }) {
  return (
    <div>
      <h1>{currentFavorite.name}</h1>
      <img src={currentFavorite.image_url} alt={currentFavorite.name} />
      <p>{currentFavorite.description}</p>
      <p>Category: {currentFavorite.category}</p>
    </div>
  );
}