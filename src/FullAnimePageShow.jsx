import { useLoaderData } from 'react-router-dom';

export function FullAnimePageShow() {
  const anime = useLoaderData();

  return (
    <div className="anime-details2">
      {/* Left 1/3 Section */}
      <div className="anime-left2">
        <h1 className="anime-title2">{anime.title}</h1>
        <img src={anime.images.jpg.image_url} alt={`${anime.title} cover`} className="anime-image2" />
        <button className="favorite-button2">Add to Favorites</button>
        
        {/* Information Section */}
        <section className="anime-info2">
          <h2>Information</h2>
          <p><strong>Type:</strong> {anime.type}</p>
          <p><strong>Episodes:</strong> {anime.episodes}</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Aired:</strong> {anime.aired.string}</p>
          <p><strong>Producers:</strong> {anime.producers.map(p => p.name).join(', ')}</p>
          <p><strong>Licensors:</strong> {anime.licensors.map(l => l.name).join(', ')}</p>
          <p><strong>Studios:</strong> {anime.studios.map(s => s.name).join(', ')}</p>
          <p><strong>Source:</strong> {anime.source}</p>
          <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Themes:</strong> {anime.themes.map(t => t.name).join(', ')}</p>
          <p><strong>Duration:</strong> {anime.duration}</p>
          <p><strong>Rating:</strong> {anime.rating}</p>
        </section>
      </div>

      {/* Right 2/3 Section */}
      <div className="anime-right2">
        <div className="top-right-section2">
          {/* Stats */}
          <div className="anime-stats2">
            <p><strong>Score:</strong> {anime.score}</p>
            <p><strong>Rank:</strong> #{anime.rank}</p>
            <p><strong>Popularity:</strong> #{anime.popularity}</p>
            <p><strong>Members:</strong> {anime.members}</p>
          </div>
          {/* Trailer */}
          <div className="anime-trailer2">
            <iframe
              src={anime.trailer.embed_url}
              title={`${anime.title} Trailer`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Synopsis and Background */}
        <div className="anime-synopsis-background2">
          <section>
            <h2>Synopsis</h2>
            <p>{anime.synopsis}</p>
          </section>
          <section>
            <h2>Background</h2>
            <p>{anime.background}</p>
          </section>
        </div>
      </div>
    </div>
  );
}