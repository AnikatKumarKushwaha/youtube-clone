/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchComments, addComment } from "../../redux/slices/videoSlice";

import SingleComment from "./SingleComment";

export default function Comments({ videoId }) {
  const [commentText, setCommentText] = useState("");

  const { token } = useSelector((state) => state.auth);
  const { comments, isLoading } = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  let username = null;
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.name;
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Invalid token:", error.message);
    }
  }

  useEffect(() => {
    if (videoId && !comments[videoId]) {
      dispatch(fetchComments(videoId));
    }
  }, [dispatch, videoId, comments]);

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await dispatch(
        addComment({
          videoid: videoId,
          userId: userId,
          text: commentText,
        })
      ).unwrap();
      dispatch(fetchComments(videoId));

      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error.message);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-lg">Comments</h1>
      <div className="my-5 flex items-center w-full ">
        {/* Display user avatar */}
        <div className="mr-3">
          <div className="w-10 h-10 text-stone-50 flex items-center justify-center bg-stone-500 rounded-full">
            {username ? username[0].toUpperCase() : "?"}
          </div>
        </div>
        {/* Input for comment */}
        <div className="w-full ">
          <input
            type="text"
            placeholder="Add comment"
            className="border-b border-stone-200 w-full bg-stone-50 px-2 pb-1 outline-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
      </div>
      {/* Button to submit comment */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleAddComment}
          className="px-3 py-1 rounded-full border border-stone-600 text-stone-600 hover:bg-stone-600 hover:text-stone-50"
        >
          Comment
        </button>
      </div>
      {/* All comments section */}
      <div className="mt-5">
        {isLoading ? (
          <p>Loading comments...</p>
        ) : comments[videoId] && comments[videoId].length > 0 ? (
          comments[videoId].map((comment) => (
            <SingleComment
              comment={comment}
              key={comment._id}
              videoId={videoId}
              userId={userId}
            />
          ))
        ) : (
          <p className=" text-center text-stone-600">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
