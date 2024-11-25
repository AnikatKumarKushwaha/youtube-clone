import { useState } from "react";
import threeDot from "../assets/dots.png";
import { MdEdit, MdDelete } from "react-icons/md";
import EditVideoModal from "../features/ChannelPage/EditVideoModal";
import DeleteVideoModal from "../features/ChannelPage/DeleteVideoModal";

export default function VideoCard({ video }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="w-full bg-stone-50">
      {/* Container for the image with a fixed height */}
      <div className="h-40 w-full relative">
        <img
          src={video.thumbnailUrl}
          alt="videos"
          className="h-40 w-full shadow-lg rounded-lg object-cover"
        />
      </div>

      <div className="my-2 flex justify-between mx-2 items-start relative">
        <div>
          {video.title.length > 43
            ? `${video.title.slice(0, 40)}...`
            : video.title}
        </div>
        <button
          className="block mt-2 w-10"
          onClick={() => setOpenEdit(!openEdit)}
        >
          <img src={threeDot} alt="three-dot" className="w-4 h-4" />
        </button>
        {openEdit && (
          <ul className="absolute w-32 shadow-lg z-20 bg-white rounded-sm right-8 top-2 p-1">
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

      {/* Modal */}
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
