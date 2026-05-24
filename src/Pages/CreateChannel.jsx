import React, { useState } from "react";
// import axios for API request
import axios from "axios";
// import useAuth for token
import { useAuth } from "../../context/AuthContext";
// import navigation tools
import { Link, useNavigate } from "react-router-dom";

function CreateChannel() {
  // BASE_URL variable for API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // get token from useAuth
  const { token } = useAuth();
  // for page navigation
  const navigate = useNavigate();

  // State for storing form input values
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    channelIcon: "",
  });

  // Loading state while creating channel
  const [loading, setLoading] = useState(false);
  // Handle input field changes
  const handleChange = (e) => {
    // Update matching field using input name
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle channel creation on submit
  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.channelName || !formData.description) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      // API request to create channel
      const res = await axios.post(
        `${BASE_URL}/channel/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Navigate to channel page after successful creation
      navigate("/channel");
    } catch (err) {
       // Show backend error message
      alert(err.response?.data?.message || "Error creating channel");
    } finally {
      // Stop loading after request completes
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 text-black">
        <div className="flex justify-between items-center mb-4">
          {/* Heading */}
          <h2 className="text-xl font-semibold">Create Channel</h2>
          {/* Closr button */}
          <Link to={"/channel"} className="text-gray-500 hover:text-black">
            ✖
          </Link>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* input for channel name */}
          <input
            type="text"
            name="channelName"
            placeholder="Channel Name"
            value={formData.channelName}
            onChange={handleChange}
            className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* textArea for description */}
          <textarea
            name="description"
            placeholder="Channel Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* input for channel icon URL */}
          <input
            type="text"
            name="channelIcon"
            placeholder="Channel Icon URL (optional)"
            value={formData.channelIcon}
            onChange={handleChange}
            className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* After pasting URL show preview of it */}
          {formData.channelIcon && (
            <div className="flex justify-center">
              <img
                src={formData.channelIcon}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            {/* Cancel button */}
            <button
              onClick={() => navigate("/channel")}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Channel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateChannel;
