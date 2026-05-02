import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

function CreateChannel({ onClose, onSuccess }) {
  const { token } = useAuth()

  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    channelIcon: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    if (!formData.channelName || !formData.description) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:3000/channel/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      onSuccess(res.data)
      onClose()

    } catch (err) {
      alert(err.response?.data?.message || "Error creating channel")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4'>

      <div className='bg-white w-full max-w-2xl rounded-2xl p-6 text-black'>

        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Create Channel</h2>
          <Link to={'/channel'} className='text-gray-500 hover:text-black'>✖</Link>
        </div>

        {/* Form */}
        <div className='flex flex-col gap-4'>

          <input
            type="text"
            name="channelName"
            placeholder="Channel Name"
            value={formData.channelName}
            onChange={handleChange}
            className='border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
          />

          <textarea
            name="description"
            placeholder="Channel Description"
            value={formData.description}
            onChange={handleChange}
            className='border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type="text"
            name="channelIcon"
            placeholder="Channel Icon URL (optional)"
            value={formData.channelIcon}
            onChange={handleChange}
            className='border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
          />

          {formData.channelIcon && (
            <div className='flex justify-center'>
              <img
                src={formData.channelIcon}
                alt="preview"
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>
          )}

          <div className='flex justify-end gap-3 mt-4'>
            <button
              onClick={onClose}
              className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300'
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700'
            >
              {loading ? "Creating..." : "Create Channel"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateChannel