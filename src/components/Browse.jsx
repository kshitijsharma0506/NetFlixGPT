import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  const { movies, error } = useNowPlayingMovies();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <MainContainer movie={movies[0]} />
      <SecondaryContainer movies={movies} />
    </div>
  );
};

export default Browse;

      {/* 
        Main Container
          - Video Background
          - Video Title
          - Video Overlay
          - Movie Suggestions
        Secondary Container
          - Movie list * n i.e Multiple cards
            - Movie Cards * n
              - Movie Image
              - Movie Title
              - Movie Overview
              - Movie Release Date
              - Movie Vote Average
      */}