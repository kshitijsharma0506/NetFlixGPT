import { useState, useEffect } from 'react';
import { options } from '../utils/constant';

export const useVideoTrailer = (movieId) => {
  const [movie_trailer, setMovieTrailer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        if (!movieId) return;

        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          options
        );
        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        setMovieTrailer(trailer);
      } catch (error) {
        setError("Error fetching movie trailer");
        console.error("Error fetching movie trailer:", error);
      }
    };

    getMovieVideos();
  }, [movieId]);

  return { movie_trailer, error };
};