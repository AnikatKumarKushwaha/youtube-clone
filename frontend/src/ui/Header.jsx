/* eslint-disable react/prop-types */
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Search from "./Search";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ProfilePopup from "./ProfilePopup";
import { useState, useEffect, useRef } from "react";

export default function Header({ handleSidebar, setOpenModal, openModal }) {
  const { token } = useSelector((state) => state.auth);

  const [openProfile, setOpenProfile] = useState(false);

  const profilePopupRef = useRef(null); // Ref for the ProfilePopup component
  const toggleButtonRef = useRef(null); // Ref for the toggle button

  function handleToggleProfile() {
    setOpenProfile((prev) => !prev);
  }

  let userDetails = null;

  if (token) {
    try {
      userDetails = jwtDecode(token); // Decode the token
    } catch (error) {
      console.error("Invalid Token:", error);
    }
  }

  // Close ProfilePopup if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profilePopupRef.current &&
        !profilePopupRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className=" flex justify-between px-2 lg:px-5 h-[4rem] items-center bg-stone-50">
      {/* *** hamburger and icon *** */}

      <div className="flex justify-center items-center lg:gap-2 ">
        {/* hamburger */}
        <button
          className="hover:bg-stone-200 lg:p-2 p-1 rounded-full"
          onClick={handleSidebar}
        >
          <RxHamburgerMenu className="lg:h-5 lg:w-5 md:w-4 md:h-4 w-3 h-3" />
        </button>
        {/* icon */}
        <div className="flex justify-center items-center gap-1">
          <FaYoutube className="text-red-500 lg:h-8 lg:w-8 md:h-6 md:w-6 h-4 w-4" />
          <span className="md:font-bold font-semibold tracking-tighter lg:text-base sm:text-sm text-xs">
            YOUTUBE{" "}
            <sup className="font-extralight lg:text-base text-xs">IN</sup>
          </span>
        </div>
      </div>
      <div>
        <Search />
      </div>
      {!token ? (
        <button
          className="px-2 py-1 flex justify-center items-center gap-1 border border-stone-200 rounded-full shadow-sm"
          onClick={() => setOpenModal(!openModal)}
        >
          <FaRegUserCircle className="text-blue-400 h-5 w-5" />
          <div className="text-blue-400">Sign in</div>
        </button>
      ) : (
        <div className="relative ">
          <button
            ref={toggleButtonRef}
            className="w-6 h-6 md:w-10 md:h-10 md:text-base text-xs flex justify-center items-center rounded-full bg-stone-200 border border-stone-400"
            onClick={handleToggleProfile}
          >
            {userDetails.name[0].toUpperCase()}
          </button>
          {openProfile && (
            <div ref={profilePopupRef}>
              <ProfilePopup
                name={userDetails.name}
                userId={userDetails.userId}
                setOpenProfile={setOpenProfile}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
