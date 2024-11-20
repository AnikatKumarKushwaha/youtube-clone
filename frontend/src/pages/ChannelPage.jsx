import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelByChannelId } from "../redux/slices/channelSlice"; // Adjust the path as needed
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VideosList from "../features/ChannelPage/VideosList";
import PostVideo from "../features/ChannelPage/PostVideo";

export default function ChannelPage() {
  const { channel, loading, error } = useSelector((state) => state.channel);
  const { token } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(true);
  console.log(channel);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getChannelByChannelId(id));
  }, [dispatch, id]);

  let userDetails = null;

  if (token) {
    try {
      userDetails = jwtDecode(token); // Decode the token
    } catch (error) {
      console.error("Invalid Token:", error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {channel ? (
        <div className="flex gap-6">
          <div className="w-40 h-40 bg-stone-300 rounded-full flex justify-center items-center uppercase text-5xl">
            {userDetails.name[0]}
          </div>
          <div className="flex flex-col justify-between my-4">
            <div>
              <h2 className="font-bold uppercase text-xl text-stone-700">
                {channel.channelName}
              </h2>
              <p className="text-stone-500 text-sm">{channel.description}</p>
            </div>
            <div className="text-stone-500">
              More about this channel...more{" "}
            </div>
            <div className="flex gap-4">
              <button className="block text-sm px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300">
                Customise channel
              </button>
              <button className="block text-sm px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300">
                Manage Videos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No channel details available</div>
      )}
      <div className=" flex gap-4 ml-6 font-semibold text-stone-700 mt-5 ">
        <button
          className={`${toggle && "border-b-2 border-stone-500"} pb-2`}
          onClick={() => setToggle(true)}
        >
          Videos
        </button>
        <button
          className={`${!toggle && "border-b-2 border-stone-500"} pb-2`}
          onClick={() => setToggle(false)}
        >
          Posts
        </button>
      </div>

      <hr />
      {toggle ? <VideosList /> : <PostVideo />}
    </div>
  );
}
