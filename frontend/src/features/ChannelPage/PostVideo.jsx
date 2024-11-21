import { useForm } from "react-hook-form";

export default function PostVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[70%] max-w-2xl bg-white shadow-lg rounded-lg ml-5 mt-10 p-6 space-y-4 border border-gray-300"
    >
      {/* Title */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter video title"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long",
            },
          })}
          placeholder="Enter video description"
          rows={4}
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Video */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Video</label>
        <input
          type="text"
          {...register("videoUrl", {
            required: "Video URL is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "Enter a valid URL",
            },
          })}
          placeholder="Enter video URL"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.videoUrl && (
          <p className="text-sm text-red-500">{errors.videoUrl.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Thumbnail</label>
        <input
          type="text"
          {...register("thumbnailUrl", {
            required: "Thumbnail URL is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "Enter a valid URL",
            },
          })}
          placeholder="Enter thumbnail URL"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.thumbnailUrl && (
          <p className="text-sm text-red-500">{errors.thumbnailUrl.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 text-white font-medium bg-stone-600 rounded-md hover:bg-stone-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-1"
      >
        Submit
      </button>
    </form>
  );
}
