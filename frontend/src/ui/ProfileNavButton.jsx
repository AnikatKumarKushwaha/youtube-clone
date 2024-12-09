/* eslint-disable react/prop-types */
export default function ProfileNavButton({ Icon, text, onClick }) {
  return (
    <button
      className="px-4 py-2 flex gap-4 items-center hover:bg-stone-100 w-full"
      onClick={onClick}
    >
      <Icon className="text-2xl" />
      <div className=" text-sm">{text}</div>
    </button>
  );
}
