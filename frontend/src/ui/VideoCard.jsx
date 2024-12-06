/* eslint-disable react/prop-types */
import { useState } from "react";
import threeDot from "../assets/dots.png";
import { MdEdit, MdDelete } from "react-icons/md";
import EditVideoModal from "../features/ChannelPage/EditVideoModal";
import DeleteVideoModal from "../features/ChannelPage/DeleteVideoModal";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="w-full bg-stone-50">
      {/* Link for navigation */}
      <Link to={`/video/${video._id}`} className="block">
        <div className="h-40 w-full relative">
          <img
            src={video.thumbnailUrl}
            alt="videos"
            className="h-40 w-full shadow-lg rounded-lg object-cover"
          />
        </div>
      </Link>

      <div className="my-2 flex justify-between mx-2 items-start relative">
        {/* Title wrapped in Link */}
        <Link to={`/video/${video._id}`} className="flex-1">
          <div>
            {video.title.length > 43
              ? `${video.title.slice(0, 40)}...`
              : video.title}
          </div>
        </Link>

        {/* Options button */}
        <button
          className="block mt-2 w-10 z-10"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering Link navigation
            setOpenEdit(!openEdit);
          }}
        >
          <img src={threeDot} alt="three-dot" className="w-4 h-4" />
        </button>

        {/* Dropdown menu */}
        {openEdit && (
          <ul className="absolute w-32 shadow-lg z-20 bg-white rounded-sm right-10 top-2 p-1">
            <li
              className="px-2 py-1 flex gap-2 items-center hover:bg-stone-100 rounded-sm"
              onClick={() => {
                setShowModal(true);
                setOpenEdit(false);
              }}
            >
              <MdEdit className="text-blue-600" /> Edit
            </li>
            <li
              className="px-2 py-1 flex gap-2 items-center hover:bg-stone-100 rounded-sm"
              onClick={() => {
                setShowDeleteModal(true);
                setOpenEdit(false);
              }}
            >
              <MdDelete className="text-red-600" />
              Delete
            </li>
          </ul>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <EditVideoModal videoData={video} setShowModal={setShowModal} />
      )}
      {showDeleteModal && (
        <DeleteVideoModal
          videoId={video._id}
          channelId={video.channelId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}
