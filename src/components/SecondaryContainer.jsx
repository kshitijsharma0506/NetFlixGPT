import MovieList from './MovieList';

const SecondaryContainer = ({ movies }) => {
  return (
    <div className="px-8 py-4">
      <h2 className="text-3xl font-bold mb-4">Now Playing</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default SecondaryContainer