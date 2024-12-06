/* eslint-disable react/prop-types */
export default function FilterButton({ children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={` block bg-stone-200 px-3 py-1 rounded-xl hover:bg-stone-900 hover:text-stone-50 ${
        isActive && "text-white bg-stone-900"
      }`}
    >
      {children}
    </button>
  );
}
