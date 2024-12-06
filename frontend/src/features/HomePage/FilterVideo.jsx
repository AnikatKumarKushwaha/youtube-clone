/* eslint-disable react/prop-types */
import FilterButton from "../../ui/FilterButton";

export default function FilterVideo({ selectedCategory, setSelectedCategory }) {
  const categories = ["All", "Music", "Gaming", "Cartoon", "Science"];

  return (
    <div
      className="flex items-center gap-3 overflow-x-auto"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {categories.map((category) => (
        <FilterButton
          key={category}
          isActive={selectedCategory === category} // Highlight active button
          onClick={() => setSelectedCategory(category)} // Update selected category
        >
          {category}
        </FilterButton>
      ))}
    </div>
  );
}
