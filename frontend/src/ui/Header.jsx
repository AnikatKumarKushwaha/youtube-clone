import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Search from "./Search";

export default function Header({ handleSidebar }) {
  return (
    <header className="flex justify-between px-5 h-16 items-center bg-white shadow-md">
      <div className="flex items-center gap-4">
        <button
          className="hover:bg-stone-200 p-2 rounded-full focus:outline-none"
          onClick={handleSidebar}
          aria-label="Toggle Sidebar"
        >
          <RxHamburgerMenu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-1">
          <FaYoutube className="text-red-500 h-8 w-8" />
          <span className="font-bold tracking-tighter text-lg">
            YOUTUBE <sup className="font-extralight text-sm">IN</sup>
          </span>
        </div>
      </div>

      <div className="flex-grow max-w-xl">
        <Search />
      </div>

      <button
        className="px-4 py-2 flex items-center gap-2 border border-stone-300 rounded-full shadow-sm hover:shadow-md focus:outline-none"
        aria-label="Sign In"
      >
        <FaRegUserCircle className="text-blue-400 h-6 w-6" />
        <span className="text-blue-400 font-medium">Sign in</span>
      </button>
    </header>
  );
}
