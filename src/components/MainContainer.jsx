import VideoBackground from './VideoBackground';

const MainContainer = ({ movie }) => {
  if (!movie) return null;
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0">
        <VideoBackground movieId={movie.id} />
      </div>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      {/* Video Title and Description */}
      <div className="absolute bottom-0 left-0 p-8 w-1/2">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-xl mb-4">{movie.overview}</p>
        <button className="bg-white text-black py-2 px-4 rounded mr-2">▶ Play</button>
        <button className="bg-gray-500 text-white py-2 px-4 rounded">More Info</button>
      </div>
    </div>
  );
};

export default MainContainer;

// https://www.youtube.com/watch?v=cT4CCK3lxiI