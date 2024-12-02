/* eslint-disable react/prop-types */

import { useState } from "react";

import ThreeDot from "../../assets/dots.png";

import { GoReport } from "react-icons/go";
import { MdDelete } from "react-icons/md";

export default function SingleComment({ comment }) {
  const [commentPopUp, setCommentPopUp] = useState(false);
  const userName = comment?.userId?.name || "Unknown";

  return (
    <div
      key={comment._id} // Use unique ID as key
      className="py-2 flex items-center gap-4 my-2"
    >
      <div className="w-10 h-10 rounded-full bg-stone-300 flex justify-center items-center">
        {userName[0]?.toUpperCase() || "?"}
      </div>
      <div>
        <p className="text-stone-600 text-sm font-semibold">@{userName}</p>
        <p className="text-stone-600 text-sm">{comment.text}</p>
      </div>
      <div className="w-4 h-4 ml-auto cursor-pointer relative">
        <button onClick={() => setCommentPopUp(!commentPopUp)}>
          <img src={ThreeDot} alt="three dot" />
        </button>
        {commentPopUp && (
          <div className="absolute bg-white shadow-md border right-3 top-5">
            <button className="w-full flex items-center justify-center px-4 py-1 gap-2">
              <GoReport className="text-orange-400" />
              Report
            </button>
            <button className="w-full flex items-center justify-center px-4 py-1 gap-2">
              <MdDelete className="text-red-500" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
