export function FavoriteShow({ currentFavorite }) {
  return (
    <div>
      <div>
        <h1>{currentFavorite.item.name}</h1>
        <img src={currentFavorite.item.image_url} alt={currentFavorite.name} />
        <p>{currentFavorite.item.description}</p>
        <p>Category: {currentFavorite.item.category}</p>
      </div>
    </div>
  );
}