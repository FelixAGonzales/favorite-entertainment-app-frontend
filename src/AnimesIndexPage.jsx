import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export function AnimesIndexPage() {
  const animes = useLoaderData();
  const [searchFilter, setSearchFilter] = useState("");

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
          <button type="info" onClick={() => (animes)}> More Info</button>
        </div>
      ))}
      </div> 
    </div>
  );
}