import React, { useState } from 'react'

function Comments({ comments = [] }) {
  const [newComment, setNewComment] = useState('')
  const [allComments, setAllComments] = useState(comments)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      commentId: Date.now().toString(),
      userId: "currentUser",
      text: newComment,
      timestamp: new Date().toISOString()
    }

    setAllComments([comment, ...allComments])
    setNewComment('')
  }

  const handleDelete = (id) => {
    setAllComments(allComments.filter(c => c.commentId !== id))
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {allComments.length} Comments
      </h2>

      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          {/* user name's first letter */} U
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

      <div className="flex flex-col gap-4">
        {allComments.map((c) => (
          <div key={c.commentId} className="flex gap-3">

            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              {c.userId[0]?.toUpperCase()}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{c.userId}</span>
                <span className="text-gray-400 text-xs">
                  {new Date(c.timestamp).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm mt-1">{c.text}</p>

              <div className="flex gap-3 mt-2 text-xs text-gray-400">
                <button className="hover:text-white">👍 Like</button>
                <button className="hover:text-white">👎 Dislike</button>
                <button onClick={() => handleDelete(c.commentId)} className="hover:text-red-400">
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Comments