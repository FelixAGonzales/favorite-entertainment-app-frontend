import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import { Modal } from "./Modal";
import { FavoriteShow } from "./FavoriteShow";

export function TopAnimePage() {
  const initialFavorites = useLoaderData();
  const [searchFilter, setSearchFilter] = useState("");
  const [animes, setAnimes] = useState(initialFavorites || []);
  const [currentFavorite, setCurrentFavorite] = useState({});
  const [isFavoriteShowVisible, setIsFavoriteShowVisible] = useState(false);

  // Fetch top anime with query parameters for filtering
  const fetchFavorites = async () => {
    const baseUrl = "https://thingproxy.freeboard.io/fetch/https://api.jikan.moe/v4/top/anime";
    const params = {
        type: "tv",            // Specify type if needed: "tv", "movie", etc.
        filter: "bypopularity", // Options: "airing", "upcoming", "bypopularity", "favorite"
        rating: "pg13",         // Audience ratings: "g", "pg", "pg13", "r17", "r", "rx"
        sfw: true,              // true to filter out adult entries
        page: 1,                // Page number for pagination
        limit: 20               // Limit number of results per page
    };

    // Convert params object to a query string
    const queryParams = new URLSearchParams(params).toString();

    try {
        const response = await fetch(`${baseUrl}?${queryParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received:", data);
        setAnimes(data.data);
    } catch (error) {
        console.error("Error fetching top anime:", error);
    }
};

  // Show the selected favorite anime details
  const handleShow = (favorite) => {
    setIsFavoriteShowVisible(true);
    setCurrentFavorite(favorite);
  };

  // Close the modal
  const handleClose = () => {
    setIsFavoriteShowVisible(false);
  };

  // Fetch anime data when component mounts
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <div className="centered-content">
        <h1>Top Anime List</h1>
        <input
          type="text"
          placeholder="Search Anime"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
        />
      </div>
      <div className="posts-container">
        {animes
          .filter((anime) =>
            anime.title.toLowerCase().includes(searchFilter.toLowerCase())
          )
          .map((anime) => (
            <div key={anime.mal_id} className="favorites">
              <h2>{anime.title}</h2>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <p>Rank: {anime.rank}</p>
              <p>Score: {anime.score}</p>
              <button type="button" onClick={() => handleShow(anime)}>
                More Info
              </button>
            </div>
          ))}
      </div>

      {/* Modal to show more details of the selected anime */}
      <Modal show={isFavoriteShowVisible} onClose={handleClose}>
        <FavoriteShow currentFavorite={currentFavorite} />
      </Modal>
    </div>
  );
}
