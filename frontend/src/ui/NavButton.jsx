export default function NavButton({ Icon, text }) {
  return (
    <li className="px-4 py-2 flex gap-4 items-center hover:bg-stone-100 rounded-xl mx-2">
      <Icon className="text-2xl" />
      <div className=" text-sm">{text}</div>
    </li>
  );
}