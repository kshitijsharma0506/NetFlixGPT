const MovieCard = ({ movie }) => {
  return (
    <div className="w-48 flex-shrink-0">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="w-full h-72 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
      <p className="text-sm text-gray-400">{movie.release_date}</p>
      <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;