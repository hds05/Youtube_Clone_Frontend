import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UploadVideo() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    videoId: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.thumbnailUrl ||
      !formData.videoId
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Video Uploaded");

      navigate("/channel");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex justify-center items-center">

      <div className="bg-zinc-900 p-6 rounded-xl w-[500px] flex flex-col gap-4">

        <h1 className="text-2xl font-bold">
          Upload Video
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <input
          type="text"
          name="videoId"
          placeholder="Video Id"
          value={formData.videoId}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-600 p-3 rounded hover:bg-red-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>
    </div>
  );
}

export default UploadVideo;