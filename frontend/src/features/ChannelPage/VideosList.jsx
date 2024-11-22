import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelVideos } from "../../redux/slices/channelSlice"; // Ensure the path is correct
import { useParams } from "react-router-dom"; // Assuming you're using React Router for `channelId`

export default function VideosList() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract channelId from the URL if applicable
  const { videos, loading, error } = useSelector((state) => state.channel);

  // Fetch videos when the component mounts
  useEffect(() => {
    if (id && (!videos || videos.length === 0)) {
      dispatch(getChannelVideos(id));
    }
  }, [id, dispatch, videos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Channel Videos</h2>
      {videos?.length > 0 ? (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <img src={video.thumbnailUrl} alt={video.title} width="150" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos available for this channel.</p>
      )}
    </div>
  );
}
