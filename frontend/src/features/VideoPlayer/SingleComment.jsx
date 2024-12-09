/* eslint-disable react/prop-types */

import { useState } from "react";

import ThreeDot from "../../assets/dots.png";

import { GoReport } from "react-icons/go";
import { MdDelete, MdEdit } from "react-icons/md";

import { useDispatch } from "react-redux";
import {
  editComment,
  deleteComment,
  fetchComments,
} from "../../redux/slices/videoSlice";

export default function SingleComment({ comment, videoId, userId }) {
  const dispatch = useDispatch();
  const [commentPopUp, setCommentPopUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const userName = comment?.userId?.name || "Unknown";

  // Enables edit mode and closes the popup
  const handleEdit = () => {
    setIsEditing(true);
    setCommentPopUp(false);
  };

  // Cancels edit mode and resets the text to the original comment
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
  };

  // Confirms the edit by dispatching an action to update the comment
  const handleConfirmEdit = async () => {
    setIsEditing(false);

    try {
      await dispatch(
        editComment({
          videoId: videoId,
          commentId: comment._id,
          text: editedText,
        })
      ).unwrap();

      // Fetches updated comments after the edit

      dispatch(fetchComments(videoId));
    } catch (error) {
      console.error("Failed to edit comment:", error.message);
    }
  };

  // Deletes the comment by dispatching a delete action
  const handleDeleteComment = () => {
    dispatch(
      deleteComment({
        videoId: videoId,
        commentId: comment._id,
      })
    );
  };

  return (
    <div className="py-2 flex items-center gap-4 my-2">
      {/* Avatar displaying the first letter of the username */}
      <div className="w-10 h-10 rounded-full bg-stone-300 flex justify-center items-center">
        {userName[0]?.toUpperCase() || "?"}
      </div>

      {/* Main comment content */}
      <div className="flex-1">
        <p className="text-stone-600 text-sm font-semibold">@{userName}</p>
        {isEditing ? (
          <div className="mt-1">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleConfirmEdit}
                className="px-4 py-1 border border-stone-600 text-stone-600 text-sm rounded hover:bg-stone-600 hover:text-stone-50"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-1 bg-gray-300 text-sm rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-stone-600 text-sm">{comment.text}</p>
        )}
      </div>
      {/* Three-dot menu for additional options */}
      <div className="w-4 h-4 ml-auto cursor-pointer relative">
        <button onClick={() => setCommentPopUp(!commentPopUp)}>
          <img src={ThreeDot} alt="three dot" />
          {/* Toggles the popup */}
        </button>
        {commentPopUp && !isEditing && (
          <div className="absolute bg-white shadow-md border right-3 top-5">
            {/* Report button */}
            <button className="w-full flex items-center px-4 py-1 gap-2 hover:bg-stone-100">
              <GoReport className="text-orange-400" />
              Report
            </button>
            {/* Edit and Delete options only for the comment owner */}
            {comment.userId._id === userId && (
              <>
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center px-4 py-1 gap-2 hover:bg-stone-100"
                >
                  <MdEdit className="text-blue-500" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="w-full flex items-center px-4 py-1 gap-2 hover:bg-stone-100"
                >
                  <MdDelete className="text-red-500" />
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
