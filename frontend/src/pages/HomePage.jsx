import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/slices/videoSlice";

import FilterVideo from "../features/HomePage/FilterVideo";
import VideoCardMain from "../ui/VideoCardMain";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function HomePage() {
  const dispatch = useDispatch();
  const { videos, isLoading } = useSelector((state) => state.videos);

  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Filter videos based on selected category
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter(
          (video) =>
            video.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div>
      {/* Pass the state handler to FilterVideo */}
      <FilterVideo
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredVideos.map((video) => (
          <VideoCardMain key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
