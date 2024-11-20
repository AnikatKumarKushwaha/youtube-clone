import FilterButton from "../../ui/FilterButton";

export default function FilterVideo() {
  return (
    <div className="flex items-center gap-3">
      <FilterButton>All</FilterButton>
      <FilterButton>Music</FilterButton>
      <FilterButton>Gaming</FilterButton>
      <FilterButton>Cartoon</FilterButton>
      <FilterButton>Science</FilterButton>
    </div>
  );
}
