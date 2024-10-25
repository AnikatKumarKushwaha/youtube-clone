import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/slices/videoSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { video, isLoading, err } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  console.log(video, isLoading);
  return <div>HomePage</div>;
}
