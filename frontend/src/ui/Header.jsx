import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Search from "./Search";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // No need for curly braces
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
    <header className=" flex justify-between px-5 h-[4rem] items-center bg-stone-50">
      {/* *** hamburger and icon *** */}

      <div className="flex justify-center items-center gap-2 ">
        {/* hamburger */}
        <button
          className="hover:bg-stone-200 p-2 rounded-full"
          onClick={handleSidebar}
        >
          <RxHamburgerMenu className="h-5 w-5" />
        </button>
        {/* icon */}
        <div className="flex justify-center items-center gap-1">
          <FaYoutube className="text-red-500 h-8 w-8" />
          <span className="font-bold tracking-tighter">
            YOUTUBE <sup className="font-extralight">IN</sup>
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
        <div className="relative">
          <button
            ref={toggleButtonRef}
            className="w-10 h-10 flex justify-center items-center rounded-full bg-stone-200 border border-stone-400"
            onClick={handleToggleProfile}
          >
            {userDetails.name[0].toUpperCase()}
          </button>
          {openProfile && (
            <div ref={profilePopupRef}>
              <ProfilePopup
                name={userDetails.name}
                userId={userDetails.userId}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
