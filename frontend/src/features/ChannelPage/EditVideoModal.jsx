/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateVideo } from "../../redux/slices/videoSlice";
import { getChannelVideos } from "../../redux/slices/channelSlice";

export default function EditVideoModal({ videoData, setShowModal }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: videoData.title,
      description: videoData.description,
      thumbnailUrl: videoData.thumbnailUrl,
      videoUrl: videoData.videoUrl,
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateVideo({ id: videoData._id, videoData: data })
      ).unwrap(); // Unwrap the action for error handling
      dispatch(getChannelVideos(videoData.channelId)); // Refetch updated videos
      setShowModal(false); // Close the modal
      toast.success("Video updated successfully!"); // Show success toast
    } catch (error) {
      toast.error("Failed to update video."); // Show error toast
      console.error("Failed to update video:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-stone-700 font-semibold mb-4 uppercase">
          Edit Video Details
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 text-stone-600"
        >
          <div>
            {/****Title****/}
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            {/****Description****/}
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            {/****Thumbnail URL****/}
            <label className="block text-sm font-medium">Thumbnail URL</label>
            <input
              type="text"
              {...register("thumbnailUrl", {
                required: "Thumbnail URL is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.thumbnailUrl && (
              <p className="text-red-500 text-sm">
                {errors.thumbnailUrl.message}
              </p>
            )}
          </div>
          <div>
            {/****Video URL****/}
            <label className="block text-sm font-medium">Video URL</label>
            <input
              type="text"
              {...register("videoUrl", { required: "Video URL is required" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.videoUrl && (
              <p className="text-red-500 text-sm">{errors.videoUrl.message}</p>
            )}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
