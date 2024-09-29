import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="flex overflow-x-auto space-x-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;