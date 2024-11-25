import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/slices/videoSlice";

import FilterVideo from "../features/HomePage/FilterVideo";
import VideoCardMain from "../ui/VideoCardMain";

export default function HomePage() {
  const dispatch = useDispatch();
  const { videos, isLoading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FilterVideo />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {videos.map((video) => (
          <VideoCardMain key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
