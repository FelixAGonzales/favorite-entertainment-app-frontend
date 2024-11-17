import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FavoriteShow } from "./FavoriteShow";

export function TopAnimePage() {
    const initialFavorites = useLoaderData();
    const [searchFilter, setSearchFilter] = useState("");
    const [animes, setAnimes] = useState(initialFavorites || []);
    const [currentFavorite] = useState({});
    const [isFavoriteShowVisible, setIsFavoriteShowVisible] = useState(false);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1 });
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        const baseUrl = "https://thingproxy.freeboard.io/fetch/https://api.jikan.moe/v4/top/anime";
        const params = {
            type: "",
            filter: "",
            rating: "",
            sfw: false,
            page: pagination.currentPage,
            limit: 20,
        };
        const queryParams = new URLSearchParams(params).toString();

        try {
            const response = await fetch(`${baseUrl}?${queryParams}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setAnimes(data.data);
            setPagination({
                lastPage: data.pagination.last_visible_page,
                currentPage: data.pagination.current_page,
            });
        } catch (error) {
            console.error("Error fetching top anime:", error);
        }
    };

    const handleShow = (animeId) => navigate(`/anime/${animeId}`);

    const handleClose = () => setIsFavoriteShowVisible(false);

    useEffect(() => {
        fetchFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.currentPage]);

    const handlePageClick = (page) => setPagination((prev) => ({ ...prev, currentPage: page }));

    const startPage = Math.max(1, pagination.currentPage - 2);
    const endPage = Math.min(startPage + 4, pagination.lastPage);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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

            <div className="anime-list-header">
                <div>Rank</div>
                <div>Title</div>
                <div>Score ⭐</div>
                <div>Aired</div>
                <div>Status</div>
            </div>

            <div className="anime-list">
                {animes
                    .filter((anime) =>
                        anime.title.toLowerCase().includes(searchFilter.toLowerCase())
                    )
                    .sort((a, b) => a.rank - b.rank)
                    .map((anime) => (
                        <div key={anime.mal_id} className="anime-row">
                            <div className="anime-rank">{anime.rank}</div>
                            <div className="anime-title">
                                <img
                                    src={anime.images.jpg.image_url}
                                    alt={anime.title}
                                    className="anime-image"
                                />
                                <div>
                                    <h2>{anime.title}</h2>
                                    <p>TV ({anime.episodes || "?"} eps)</p>
                                    <p>{anime.aired.from?.slice(0, 4)}</p>
                                    <p>{anime.members} members</p>
                                </div>
                            </div>
                            <div className="anime-score">{anime.score} ⭐</div>
                            <div className="anime-status">{anime.status}</div>
                            <button type="button" onClick={() => handleShow(anime.mal_id)}>
                                More Info
                            </button>
                        </div>
                    ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <p>Current Page: {pagination.currentPage}</p>
                <button onClick={() => handlePageClick(1)} disabled={pagination.currentPage === 1}>
                    First
                </button>
                <button
                    onClick={() => handlePageClick(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                >
                    Previous
                </button>

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={pagination.currentPage === page ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageClick(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.lastPage}
                >
                    Next
                </button>
                <button
                    onClick={() => handlePageClick(pagination.lastPage)}
                    disabled={pagination.currentPage === pagination.lastPage}
                >
                    Last
                </button>
            </div>

            <Modal show={isFavoriteShowVisible} onClose={handleClose}>
                <FavoriteShow currentFavorite={currentFavorite} />
            </Modal>
        </div>
    );
}