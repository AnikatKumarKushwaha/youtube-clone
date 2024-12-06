/* eslint-disable react/prop-types */
import NavButton from "./NavButton";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";

export default function SideBar({ openSidebar }) {
  return (
    <div
      className={`bg-stone-50 flex flex-col justify-between h-[calc(100vh-4rem)] w-52 duration-200 ease-in-out ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul>
        <NavButton Icon={IoMdHome} text="Home" path="/" />
        <NavButton Icon={SiYoutubeshorts} text="Shorts" />
        <NavButton Icon={MdSubscriptions} text="Subscriptions" />
        <hr className="m-4" />
      </ul>
      <div className="px-6 py-4 text-xs font-bold text-stone-500">
        <div className="mb-4">
          About Press Copyright Contact us Creator Advertise Developers
        </div>
        <div className="mb-4">
          Terms Privacy Policy & Safety How YouTube works Test new features
        </div>
        <div className="font-light text-xs ">&copy; 2024 Google LLC</div>
      </div>
    </div>
  );
}
