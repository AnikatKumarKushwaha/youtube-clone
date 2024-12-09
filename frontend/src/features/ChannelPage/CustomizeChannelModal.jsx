/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChannel } from "../../redux/slices/channelSlice";
import { toast } from "react-toastify";

export default function CustomizeChannelModal({ channel, setShowModal }) {
  const [channelName, setChannelName] = useState(channel.channelName);
  const [description, setDescription] = useState(channel.description);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateChannel({
          id: channel._id,
          name: channelName,
          description,
          token,
        })
      ).unwrap(); // Unwrap for error handling
      toast.success("Channel updated successfully!"); // Success message
      setShowModal(false); // Close modal
    } catch (error) {
      toast.error(error || "Failed to update channel."); // Error message
      console.error("Update Channel Error:", error);
    }
  };

  return (
    // Overlay for the modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-stone-700 mb-4">
          Customize Channel
        </h2>
        {/* Form for updating channel details */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-stone-600 mb-1">Channel Name</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>
          <div>
            <label className="block text-stone-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
