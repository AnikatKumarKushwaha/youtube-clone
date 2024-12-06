import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { videos } = useSelector((state) => state.videos);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
    } else {
      // Filter videos by title
      const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredVideos); // Update suggestions
    }
  };

  const handleSuggestionClick = (title, videoId) => {
    navigate(`video/${videoId}`);
    setQuery(title); // Set the input value to the clicked suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="relative">
      {/* Search Form */}
      <form className="rounded-full flex border border-stone-200 shadow-sm">
        <input
          type="text"
          placeholder="Search"
          className="w-40 px-2 md:px-4 rounded-tl-full rounded-bl-full py-1 md:py-2 sm:w-72 md:w-96 outline-none focus:ring-1 ring-blue-700 focus:shadow-inner"
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-stone-200 px-2 md:px-6 py-2 rounded-tr-full rounded-br-full ml-[1px]"
        >
          <FaMagnifyingGlass />
        </button>
      </form>

      {/* Suggested Video Titles */}
      {suggestions.length > 0 && (
        <div className=" absolute top-12 z-10 w-full bg-white border border-stone-200 shadow rounded-lg max-h-40 overflow-y-auto">
          {suggestions.map((video) => (
            <div
              key={video._id} // Unique key for each video
              className="px-4 py-2 hover:bg-stone-100 cursor-pointer"
              onClick={() => handleSuggestionClick(video.title, video._id)}
            >
              {video.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
