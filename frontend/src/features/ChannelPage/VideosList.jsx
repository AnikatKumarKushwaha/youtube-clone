import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelVideos } from "../../redux/slices/channelSlice";
import { useParams } from "react-router-dom";
import VideoCard from "../../ui/VideoCard";

export default function VideosList() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { videos, loading, error, videosLoaded } = useSelector(
    (state) => state.channel
  );
  console.log(videos);

  useEffect(() => {
    // Fetch videos only if not already loaded for the current channel
    if (id && !videosLoaded) {
      dispatch(getChannelVideos(id));
    }
  }, [id, dispatch, videosLoaded]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div>Error: {error.message || "Something went wrong."}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-center items-center">
      {videos?.length > 0 ? (
        videos.map((video) => (
          <VideoCard
            key={video._id}
            thumbnail={video.thumbnailUrl}
            title={video.title}
            video={video} // Updated video prop
          />
        ))
      ) : (
        <p className="col-span-4 text-center my-6 font-semibold uppercase text-stone-600">
          No videos available for this channel.
        </p>
      )}
    </div>
  );
}
