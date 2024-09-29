import { useVideoTrailer } from '../hooks/useVideoTrailer';

const VideoBackground = ({ movieId }) => {
  const { movie_trailer, error } = useVideoTrailer(movieId);

  if (error || !movie_trailer) return null;

  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${movie_trailer.key}?autoplay=1&mute=1&controls=0&loop=1`}
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
};

export default VideoBackground;