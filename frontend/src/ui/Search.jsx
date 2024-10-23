import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Search() {
  return (
    <form className="rounded-full flex border  border-stone-200 shadow-sm">
      <input
        type="text"
        placeholder="Search"
        className="px-4 rounded-tl-full rounded-bl-full py-2  w-96 outline-none focus:ring-1 ring-blue-700 focus:shadow-inner"
      />
      <button
        type="submit"
        className="  bg-stone-200 px-6 py-2 rounded-tr-full rounded-br-full ml-[1px]"
      >
        <FaMagnifyingGlass />
      </button>
    </form>
  );
}
