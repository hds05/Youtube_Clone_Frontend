import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Comments({ comments = [], videoId }) {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleAddComment = async () => {
    if (!user) {
      alert("Login required");
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/video/${videoId}/uploadComment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAllComments(res.data.comments);
      setNewComment("");
    } catch (err) {
      console.log(err.message);
      alert("Failed to upload comment due to: ", err.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/video/${videoId}/deleteComment`,
        {
          data: { commentId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAllComments(res.data.comments);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Not able to delete the comment!!");
    }
  };
  const handleEditStart = (e) => {
    setEditingId(e._id);
    setEditText(e.text);
  };
  console.log(allComments, "all comments");
  
  const handleEditSave = async (id) => {
    if (!editText.trim()) return;

    try {
      const res = await axios.put(
        `http://localhost:3000/video/${videoId}/editComment`,
        {
          commentId: id,
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAllComments(res.data.comments);
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.log(err.message, "from comment edit");
      alert("Not able to edit the comment!!!");
    }
  };
  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  useEffect(() => {
    console.log("Comments from backend:", comments);
    setAllComments(comments);
  }, [comments]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {allComments.length} Comments
      </h2>
      {user ? (
        <div className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            {user.name?.[0]?.toUpperCase()}
          </div>

          <div className="flex w-full flex-col">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 outline-none p-2 text-sm"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setNewComment("")}
                className="px-3 py-1 text-sm hover:bg-gray-800 rounded cursor-pointer"
              >
                Cancel
              </button>

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
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer text-sm text-black p-2 mb-4 rounded-lg  bg-gray-200 border"
        >
          Login to add comments
        </button>
      )}
      <div className="flex flex-col gap-4">
        {allComments.map((c) => {
          console.log("Logged in user:", user);
          console.log("Comment:", c);
          return (
            <div key={c._id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                {(c.userId?.name || c.userName || "U")[0]?.toUpperCase()}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {c.userName || c.userId?.name || "User"}
                  </span>

                  <span className="text-gray-400 text-xs">
                    {new Date(c.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {editingId === c._id ? (
                  <div className="mt-2 flex flex-col gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-transparent border border-gray-600 rounded p-2 text-sm outline-none"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSave(c._id)}
                        className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>

                      <button
                        onClick={handleEditCancel}
                        className="text-xs bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm mt-1">{c.text}</p>
                )}

                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <button className="hover:text-white">👍 Like</button>

                  <button className="hover:text-white">👎 Dislike</button>

                  {user &&
                    (String(user.id) === String(c.userId?._id) ||
                      user.name === c.userName) && (
                      <>
                        <button
                          onClick={() => handleEditStart(c)}
                          className="hover:text-blue-400 cursor-pointer"
                        >
                          Edit
                        </button>

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
