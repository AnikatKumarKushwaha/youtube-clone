/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../redux/slices/channelSlice";
import { useState } from "react";

export default function CreateChannelModal({ name, handelModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.channel);

  const { token } = useSelector((state) => state.auth);

  const [successMessage, setSuccessMessage] = useState("");

  async function onSubmit(data) {
    dispatch(createChannel({ ...data, token }))
      .unwrap()
      .then((res) => {
        setSuccessMessage("Channel created successfully!");
        console.log("Success Response:", res);
        handelModal(); // Close the modal
      })
      .catch((err) => {
        console.error("Error creating channel:", err);
      });
  }

  return (
    <div className="fixed inset-0 z-10">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded shadow-xl h-[95%] w-[95%] z-20 bg-stone-100">
        <h1 className="text-lg font-bold">How You’ll Appear</h1>

        <div className="flex justify-center items-center h-52 mt-10">
          <div className="w-28 h-28 rounded-full bg-stone-300 flex justify-center items-center uppercase text-3xl font-bold">
            {name[0]}
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-52">
            <label className="block font-semibold mb-1">Channel Name</label>
            <input
              type="text"
              className="w-full rounded-md px-2 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your channel name"
              {...register("channelName", {
                required: "Channel name is required",
                minLength: {
                  value: 3,
                  message: "Channel name must be at least 3 characters",
                },
              })}
            />
            {errors.channelName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.channelName.message}
              </p>
            )}
          </div>
          <div className="px-52">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full rounded-md px-2 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your channel description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <label className="text-justify mt-5 px-52">
            By clicking Create Channel, you agree to{" "}
            <span className="text-blue-500">YouTubes Terms of Service.</span>
            Changes made to your name and profile picture are visible only on
            YouTube and not other Google services.{" "}
            <span className="text-blue-500">Learn more.</span>
          </label>
          {loading && <p className="text-blue-500 mt-2 px-52">Loading...</p>}

          {successMessage && (
            <p className="text-green-500 mt-2 px-52">{successMessage}</p>
          )}
          <div className="flex justify-end gap-4 mt-10">
            <button type="button" className="font-bold" onClick={handelModal}>
              Cancel
            </button>
            <button type="submit" className="font-bold text-blue-600">
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
