import React, { useEffect, useState } from "react";
// Importing authentication context to get logged in user data and token
import { useAuth } from "../../context/AuthContext";
// Import useNavigate hook for page navigation
import { useNavigate } from "react-router-dom";
// Import axios for APIs
import axios from "axios";

// Comments component receives: array of comments from backend and current video id
function Comments({ comments = [], videoId }) {
  // State to store new comment input text
  const [newComment, setNewComment] = useState("");
  // State to store all comments
  const [allComments, setAllComments] = useState([]);
  // State to store which comment is being edited
  const [editingId, setEditingId] = useState(null);
  // State to store edited text while editing comment
  const [editText, setEditText] = useState("");

  // BASE_URL variable for API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // navigate variable for navigation
  const navigate = useNavigate();
  // Getting logged in user and token from auth context
  const { user, token } = useAuth();

  // Add comment
  const handleAddComment = async () => {
    // If user not logged in
    if (!user) {
      alert("Login required");
      return;
    }
    // It prevent empty comments
    if (!newComment.trim()) return;

    try {
      // API request to upload comment
      const res = await axios.post(
        `${BASE_URL}/video/${videoId}/uploadComment`,
        // Sending comment text
        { text: newComment },

        // Sending token for protected route
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Update comments instantly in frontend
      setAllComments(res.data.comments);
      // Clear input field after comment added
      setNewComment("");
    } catch (err) {
      console.log(err.message);
      alert("Failed to upload comment due to: ", err.message);
    }
  };

  // Function to delete the comment
  const handleDelete = async (id) => {
    try {
      // API request to delete comment
      const res = await axios.delete(
        `${BASE_URL}/video/${videoId}/deleteComment`,
        {
          // In DELETE request data goes inside "data"
          data: { commentId: id },
          // Sending token
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Update comments after deleting
      setAllComments(res.data.comments);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Not able to delete the comment!!");
    }
  };

  // Start editing comment
  const handleEditStart = (e) => {
    // Store current comment id
    setEditingId(e._id);
    // Put old text in input field
    setEditText(e.text);
  };

  // Function tosave the Edit
  const handleEditSave = async (id) => {
    // Prevent empty field
    if (!editText.trim()) return;

    try {
      // API to update the comment
      const res = await axios.put(
        `${BASE_URL}/video/${videoId}/editComment`,
        {
          // Sending comment ID
          commentId: id,
          // Sending updated comment text
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update comments in frontend immediatly
      setAllComments(res.data.comments);
      // Exit edit mode
      setEditingId(null);
      // Empty the edit input field
      setEditText("");
    } catch (err) {
      // Alert, if not able to update. API doen't work
      alert("Not able to edit the comment!!!");
    }
  };

  // FUnction to cancel the edit
  const handleEditCancel = () => {
    // Exit the edit mode
    setEditingId(null);
    // Clear the edit field
    setEditText("");
  };

  // Store comments from backend in state
  useEffect(() => {
    // Store comments in local state
    setAllComments(comments);
  }, [comments]);

  return (
    <div className="mt-6">
      {/* Comment count */}
      <h2 className="text-lg font-semibold mb-4">
        {allComments.length} Comments
      </h2>
      {/* If user logged in */}
      {user ? (
        // Show comment box
        <div className="flex gap-3 mb-6">
          {/* Show first letter of the username as avtar */}
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex w-full flex-col">
            {/* input field for comment */}
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 outline-none p-2 text-sm"
            />
            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-2">
              {/* Cancel button */}
              <button
                onClick={() => setNewComment("")}
                className="px-3 py-1 text-sm hover:bg-gray-800 rounded cursor-pointer"
              >
                Cancel
              </button>
              {/* Add Comment button */}
              <button
                onClick={handleAddComment}
                className="px-4 py-1 text-sm bg-blue-600 rounded-full hover:bg-blue-700 cursor-pointer"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        // If not logged in then show button to login
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer text-sm text-black p-2 mb-4 rounded-lg  bg-gray-200 border"
        >
          Login to add comments
        </button>
      )}

      {/* All comments */}
      <div className="flex flex-col gap-4">
        {/* Loop through all comments */}
        {allComments.map((c) => {
          return (
            // Single comment container
            <div key={c._id} className="flex gap-3">
              {/* avtar */}
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                {(c.userId?.name || c.userName || "U")[0]?.toUpperCase()}
              </div>
              {/* user name and comment date */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {c.userName || c.userId?.name || "User"}
                  </span>

                  <span className="text-gray-400 text-xs">
                    {new Date(c.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {/* Edit */}
                {editingId === c._id ? (
                  // If current comment is being edited
                  <div className="mt-2 flex flex-col gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-transparent border border-gray-600 rounded p-2 text-sm outline-none"
                    />

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {/* Save button */}
                      <button
                        onClick={() => handleEditSave(c._id)}
                        className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      {/* Cancel button */}
                      <button
                        onClick={handleEditCancel}
                        className="text-xs bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Only comment text
                  <p className="text-sm mt-1">{c.text}</p>
                )}

                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  {/* Static like dislike button */}
                  <button className="hover:text-white">👍 Like</button>
                  <button className="hover:text-white">👎 Dislike</button>

                  {/* Functional edit delete button for the comment owner */}
                  {user &&
                    // Compare logged in user id with comment user id or compare users
                    (String(user.id) === String(c.userId?._id) ||
                      user.name === c.userName) && (
                      <>
                      {/* Edit button */}
                        <button
                          onClick={() => handleEditStart(c)}
                          className="hover:text-blue-400 cursor-pointer"
                        >
                          Edit
                        </button>
                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="hover:text-red-400 cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
