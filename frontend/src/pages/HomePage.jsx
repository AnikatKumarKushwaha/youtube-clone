import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/slices/videoSlice";

import FilterVideo from "../features/HomePage/FilterVideo";

export default function HomePage() {
  const dispatch = useDispatch();
  const { video, isLoading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  console.log(video, isLoading);
  return (
    <div>
      <FilterVideo />
      <div>HomePage</div>
    </div>
  );
}
