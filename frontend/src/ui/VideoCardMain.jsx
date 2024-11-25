/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function VideoCardMain({ video }) {
  return (
    <Link className="w-full bg-stone-50" to={`/video/${video._id}`}>
      <div className="h-40 w-full relative">
        <img
          src={video.thumbnailUrl}
          alt="videos"
          className="h-40 w-full  shadow-lg rounded-lg object-cover"
        />
      </div>

      <div className="mt-2 ">
        <div className="font-semibold text-sm">
          {video.title.length > 53
            ? `${video.title.slice(0, 50)}...`
            : video.title}
        </div>
      </div>
      <div className="text-xs tracking-wide flex gap-2 items-center text-stone-500">
        {video.channelId.channelName} <FaCheckCircle />
      </div>
      <div className="text-xs tracking-wide text-stone-500">
        {video.views} views
      </div>
    </Link>
  );
}
