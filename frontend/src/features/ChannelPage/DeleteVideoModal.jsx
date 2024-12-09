/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteVideo } from "../../redux/slices/videoSlice";
import { getChannelVideos } from "../../redux/slices/channelSlice";

export default function DeleteVideoModal({
  videoId,
  setShowDeleteModal,
  channelId,
}) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteVideo(videoId)).unwrap(); // Dispatch the delete action
      dispatch(getChannelVideos(channelId)); // Refetch updated videos for the channel
      toast.success("Video deleted successfully!"); // Show success toast
      setShowDeleteModal(false); // Close the modal
    } catch (error) {
      toast.error("Failed to delete the video."); // Show error toast
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-stone-700 font-semibold mb-4 uppercase">
          Confirm Delete
        </h2>
        <p className="text-stone-600 mb-6">
          Are you sure you want to delete this video? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
