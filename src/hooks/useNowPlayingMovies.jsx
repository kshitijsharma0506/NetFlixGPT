import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';
import { options } from '../utils/constant';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  
  const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await fetch(API_URL, options);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movies:', err);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return { movies, error };
};

export default useNowPlayingMovies;