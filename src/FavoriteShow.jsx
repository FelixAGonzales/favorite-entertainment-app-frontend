// export function FavoriteShow({ currentFavorite }) {
//   return (
//     <div>
//       <div>
//         <h1>{currentFavorite.item.name}</h1>
//         <img src={currentFavorite.item.image_url} alt={currentFavorite.name} />
//         <p>{currentFavorite.item.description}</p>
//         <p>Category: {currentFavorite.item.category}</p>
//       </div>
//     </div>
//   );
// }

export function FavoriteShow({ currentFavorite }) {
  return (
    <div className="anime-show-container">
      <div className="anime-details">
        <img 
          src={currentFavorite.item.image_url} 
          alt={currentFavorite.item.name} 
          className="anime-image" 
        />
        
        <div className="anime-description">
          <h1>{currentFavorite.item.name}</h1>
          <p>{currentFavorite.item.description}</p>
          <p>Category: {currentFavorite.item.category}</p>
        </div>
      </div>
    </div>
  );
}