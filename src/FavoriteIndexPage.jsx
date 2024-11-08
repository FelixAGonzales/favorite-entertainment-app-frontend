import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export function FavoriteIndexPage() {
  const favorites = useLoaderData();
  const [searchFilter, setSearchFilter] = useState("");
  console.log(favorites);


  return (
    <div>
      <h1>My Favorite Anime List</h1>
      <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)}/>
      <div className="posts-container">

      {favorites.filter((favorite) => favorite.item.name.toLowerCase().includes(searchFilter.toLowerCase())).map(favorite => (

      // {favorites.map(favorite => (
        <div key={favorite.id}>
          <h2>{favorite.item.name}</h2>
          <img src={favorite.item.image_url} alt="" />
          <p> {favorite.item.description}</p>
          <p>Category: {favorite.item.category}</p>
          <button type="info" onClick={() => (favorite)}> More Info</button>
        </div>
      )
      )}
      </div>
    </div>
  );
}



//   return (
//     <div>
//       <h1>Anime List</h1>
//       <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)}/>
//       <div className="posts-container">
//       {animes.filter((animes) => animes.name.toLowerCase().includes(searchFilter.toLowerCase())).map(animes => (
//         <div key={animes.id} className="animes">
//           <h2>{animes.name}</h2>
//           <img src={animes.image_url} alt="" />
//           <p> {animes.description}</p>
//           <p>Category: {animes.category}</p>
//           <button type="info" onClick={() => (animes)}> More Info</button>
//         </div>
//       ))}
//       </div> 
//     </div>
//   );
// }