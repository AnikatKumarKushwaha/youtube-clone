import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Search from "./Search";

export default function Header({ handleSidebar }) {
  return (
    <header className=" flex justify-between px-5 h-[4rem] items-center">
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
      <button className="px-2 py-1 flex justify-center items-center gap-1 border border-stone-200 rounded-full shadow-sm">
        <FaRegUserCircle className="text-blue-400 h-5 w-5" />
        <div className="text-blue-400">Sign in</div>
      </button>
    </header>
  );
}
