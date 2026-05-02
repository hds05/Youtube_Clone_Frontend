import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Comments({ comments = [] }) {
  const [newComment, setNewComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    setAllComments(comments)
  }, [comments])

  const handleAddComment = () => {
    if (!user) {
      alert("Login required");
      return;
    }
    if (!newComment.trim()) return

    const comment = {
      commentId: Date.now().toString(),
      userId: user._id,
      userName: user.name,
      text: newComment,
      timestamp: new Date().toISOString()
    }

    setAllComments([comment, ...allComments])
    setNewComment('')
  }
  const handleDelete = (id) => {
    setAllComments(allComments.filter(c => c.commentId !== id))
  }
  const handleEditStart = (comment) => {
    setEditingId(comment.commentId)
    setEditText(comment.text)
  }
  const handleEditSave = (id) => {
    if (!editText.trim()) return

    const updatedComments = allComments.map(c => {
      if (c.commentId === id) {
        return {
          ...c,
          text: editText
        }
      }
      return c
    })
    setAllComments(updatedComments)
    setEditingId(null)
    setEditText('')
  }
  const handleEditCancel = () => {
    setEditingId(null)
    setEditText('')
  }

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
              <button onClick={() => setNewComment('')} className="px-3 py-1 text-sm hover:bg-gray-800 rounded">
                Cancel
              </button>

              <button onClick={handleAddComment} className="px-4 py-1 text-sm bg-blue-600 rounded-full hover:bg-blue-700">
                Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/login')} className="cursor-pointer text-sm text-black p-2 mb-4 rounded-lg  bg-gray-200 border">
          Login to add comments
        </button>
      )}
      <div className="flex flex-col gap-4">
        {allComments.map((c) => (
          <div key={c.commentId} className="flex gap-3">

            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              {(c.userName || c.userId)?.[0]?.toUpperCase()}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">
                  {c.userName || c.userId}
                </span>

                <span className="text-gray-400 text-xs">
                  {new Date(c.timestamp).toLocaleDateString()}
                </span>
              </div>
              {editingId === c.commentId ? (
                <div className="mt-2 flex flex-col gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="bg-transparent border border-gray-600 rounded p-2 text-sm outline-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSave(c.commentId)}
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
                <p className="text-sm mt-1">
                  {c.text}
                </p>
              )}

              <div className="flex gap-3 mt-2 text-xs text-gray-400">
                <button className="hover:text-white">
                  👍 Like
                </button>

                <button className="hover:text-white">
                  👎 Dislike
                </button>

                {user &&
                  (user._id === c.userId ) && (
                    <>
                      <button
                        onClick={() => handleEditStart(c)}
                        className="hover:text-blue-400"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c.commentId)}
                        className="hover:text-red-400"
                      >
                        Delete
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments