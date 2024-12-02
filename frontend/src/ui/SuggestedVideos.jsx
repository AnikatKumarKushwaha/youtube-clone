import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function SuggestedVideos({ video }) {
  return (
    <Link className="flex items-center gap-2" to={`/video/${video._id}`}>
      <div>
        <img
          src={video.thumbnailUrl}
          alt="suggested video"
          className="w-[100%] h-20 object-cover rounded-md"
        />
      </div>
      <div className="w-[60%]">
        <h2 className="text-sm font-semibold">
          {video.title.length > 53
            ? `${video.title.slice(0, 53)}...`
            : video.title}
        </h2>
        <div className="text-xs ">{video.views} views</div>
      </div>
    </Link>
  );
}
