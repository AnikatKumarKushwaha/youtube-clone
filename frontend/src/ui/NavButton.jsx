/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function NavButton({ Icon, text, path }) {
  return (
    <Link
      className="px-4 py-2 flex gap-4 items-center hover:bg-stone-100 rounded-xl mx-2"
      to={path}
    >
      <Icon className="text-2xl" />
      <div className=" text-sm">{text}</div>
    </Link>
  );
}
