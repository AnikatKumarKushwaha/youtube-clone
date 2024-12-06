import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelByChannelId } from "../redux/slices/channelSlice";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VideosList from "../features/ChannelPage/VideosList";
import PostVideo from "../features/ChannelPage/PostVideo";
import CustomizeChannelModal from "../features/ChannelPage/CustomizeChannelModal";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ChannelPage() {
  const { channel, loading, error } = useSelector((state) => state.channel);
  const { token } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(true);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (!channel || channel._id !== id) {
      dispatch(getChannelByChannelId(id));
    }
  }, [dispatch, id, channel]);

  let userDetails = null;

  if (token) {
    try {
      userDetails = jwtDecode(token);
    } catch (error) {
      console.error("Invalid Token:", error);
    }
  }

  if (loading)
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {channel ? (
        <div className="flex gap-2 sm:gap-6">
          <div>
            <div className="w-20 h-20 sm:w-40 sm:h-40 bg-stone-300 rounded-full flex justify-center items-center uppercase text-5xl">
              {userDetails.name[0]}
            </div>
          </div>
          <div className="flex flex-col justify-between my-4">
            <div>
              <h2 className="font-bold uppercase text-base sm:text-xl text-stone-700">
                {channel.channelName}
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm">
                {channel.description.length > 48
                  ? channel.description.slice(0, 48) + "...more"
                  : channel.description}
              </p>
            </div>
            <div className="text-stone-500 text-xs sm:text-sm">
              More about this channel...more{" "}
            </div>
            <div className="flex gap-2">
              <button
                className="block text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-stone-200 hover:bg-stone-300"
                onClick={() => setShowCustomizeModal(!showCustomizeModal)}
              >
                Customise channel
              </button>
              <button className="block  text-xs sm:text-sm px-2 sm:px-4 py-1 rounded-full bg-stone-200 hover:bg-stone-300">
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
      {showCustomizeModal && (
        <CustomizeChannelModal
          channel={channel}
          setShowModal={setShowCustomizeModal}
        />
      )}
    </div>
  );
}
