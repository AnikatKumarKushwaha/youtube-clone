import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoById, likeVideo } from "../redux/slices/videoSlice";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import {
  getChannelByChannelId,
  getChannelVideos,
} from "../redux/slices/channelSlice";
import { FaCheckCircle } from "react-icons/fa";
import SuggestedVideos from "../ui/SuggestedVideos";
import Comments from "../features/VideoPlayer/Comments";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function VideoPlayerPage() {
  const dispatch = useDispatch();
  const { id: videoId } = useParams();

  const {
    channel,
    videos,
    isLoading: channelLoading,
  } = useSelector((state) => state.channel);
  const {
    currentVideo,
    isLoading: videoLoading,
    error,
  } = useSelector((state) => state.videos);

  // Fetch video details and channel details
  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoById(videoId)); // Fetch the video
    }
  }, [videoId, dispatch]);

  useEffect(() => {
    if (currentVideo?.channelId) {
      dispatch(
        getChannelByChannelId(
          currentVideo.channelId._id || currentVideo.channelId
        )
      );
    }
  }, [currentVideo, dispatch]);

  // Fetch channel videos once channel data is available
  useEffect(() => {
    if (channel?._id) {
      dispatch(getChannelVideos(channel._id)); // Fetch videos for the channel
    }
  }, [channel, dispatch]);

  const handleLike = (e) => {
    e.preventDefault();
    if (currentVideo?._id) {
      dispatch(likeVideo(currentVideo._id));
    }
  };

  // Handle loading state
  if (videoLoading || channelLoading)
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex lg:flex-row flex-col text-stone-700 lg:gap-0 gap-10">
      {currentVideo ? (
        <div className="lg:w-[70%]">
          <iframe
            src={currentVideo.videoUrl}
            title={currentVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="block mb-[16px] w-[100%] h-[300px] sm:h-[450px]"
          ></iframe>
          <h1 className="text-lg font-semibold">{currentVideo.title}</h1>
          {/** subscribe channel section */}
          <div
            className="flex items-center gap-2 justify-between overflow-x-auto"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <div>
                <div className="bg-stone-600 text-stone-50 text-xl w-10 h-10 flex items-center justify-center rounded-full">
                  {channel?.channelName?.[0] || "?"}
                </div>
              </div>
              <div className="flex justify-center items-center gap-1">
                {channel?.channelName || "Unknown Channel"}{" "}
                <FaCheckCircle className="inline-block text-sm text-stone-400 pb-[1px]" />
              </div>
              <div className="ml-4 px-4 py-1 bg-stone-800 text-stone-50 rounded-full">
                Subscribe
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full  bg-stone-200 flex items-center justify-center">
                <button
                  className="border-r border-stone-400 px-2 py-1 flex items-center gap-2"
                  onClick={(event) => handleLike(event)}
                >
                  <MdOutlineThumbUp className="text-lg" />
                  {currentVideo.likes}
                </button>
                <button className="px-2 py-1">
                  <MdOutlineThumbDown className="text-lg" />
                </button>
              </div>
              <div className="px-2 py-1 flex items-center gap-2 bg-stone-200 rounded-full">
                <PiShareFat className="text-lg" /> Share
              </div>
              <div className="px-2 py-1 flex items-center gap-2 bg-stone-200 rounded-full">
                Download
              </div>
            </div>
          </div>
          <p className="my-5 text-sm bg-stone-300 p-2 rounded-lg">
            {currentVideo.description}
          </p>
          <div>
            <Comments videoId={currentVideo._id} />
          </div>
        </div>
      ) : (
        <div>Loading video details...</div>
      )}
      <div className="lg:w-[30%] ml-4 flex flex-col gap-4">
        {videos?.length > 0 ? (
          videos.map((video) => (
            <SuggestedVideos video={video} key={video._id} />
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
}
