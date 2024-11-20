/* eslint-disable react/prop-types */
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import ProfileNavButton from "./ProfileNavButton";
import { useState, useEffect } from "react";
import CreateChannelModal from "../pages/CreateChannelModal";
import { useSelector, useDispatch } from "react-redux";
import { getChannelById } from "../redux/slices/channelSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePopup({ name, userId }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access channel data and loading state from Redux store
  const { channel, loading } = useSelector((state) => state.channel);

  // Toggle Modal
  function handelModal() {
    setOpenModal(!openModal);
  }

  // Navigate to channel page
  function viewChannel() {
    navigate(`/channel/${channel._id}`); // Adjust route as per your application
  }

  // Fetch channel on component mount if userId is available
  useEffect(() => {
    if (userId) {
      dispatch(getChannelById(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="bg-white shadow-sm w-72 absolute right-11 rounded-lg text-stone-700">
      <div className="flex gap-4 px-3 py-2">
        <div className="w-10 h-10 rounded-full bg-stone-200 flex justify-center items-center">
          {name[0].toUpperCase()}
        </div>
        <div className="text-start">
          <div>{name}</div>
          <div>randomTextForNow</div>
          {!loading && (
            <>
              {channel ? (
                <button
                  className="text-sm pt-2 pb-4 text-blue-600"
                  onClick={viewChannel}
                >
                  View Channel
                </button>
              ) : (
                <button
                  className="text-sm pt-2 pb-4 text-blue-600"
                  onClick={handelModal}
                >
                  Create Channel
                </button>
              )}
            </>
          )}
          {openModal && (
            <CreateChannelModal name={name} handelModal={handelModal} />
          )}
        </div>
      </div>
      <hr />
      <div className="text-start pb-4">
        <div>
          <ProfileNavButton Icon={FaGoogle} text="Google Account" />
        </div>
        <div>
          <ProfileNavButton
            Icon={MdOutlineSwitchAccount}
            text="Switch account"
          />
        </div>
        <div>
          <ProfileNavButton Icon={FaSignOutAlt} text="SignOut" />
        </div>
      </div>
    </div>
  );
}
