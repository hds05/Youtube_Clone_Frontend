import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

function UploadVideo({ setUpload, editMode = false, videoData , refreshVideos }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    videoType: "youtube",
    videoUrl: "",
  });

  const [videoFile, setVideoFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const extractYoutubeId = (url) => {
    try {
      const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
      const match = url.match(regExp);
      return match ? match[1] : url;
    } catch (err) {
      return url;
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.thumbnailUrl
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = {
        ...formData,
        videoUrl:
          formData.videoType === "youtube"
            ? extractYoutubeId(formData.videoUrl)
            : formData.videoUrl,
      };

      let res;

      if (editMode) {
        res = await axios.put(
          `http://localhost:3000/video/${videoData._id}/edit`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert("Video Updated Successfully");
      } else {
        const form = new FormData();

        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });

        if (formData.videoType === "upload") {
          form.append("videoFile", videoFile);
        }

        res = await axios.post("http://localhost:3000/upload", form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Video Uploaded Successfully");
      }

      setUpload(false);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editMode && videoData) {
      setFormData({
        title: videoData.title,
        description: videoData.description,
        category: videoData.category,
        thumbnailUrl: videoData.thumbnailUrl,
        videoType: videoData.videoType,
        videoUrl: videoData.videoUrl,
      });
    }
  }, [editMode, videoData]);

  return (
    <div className="fixed inset-0 bg-black/80 text-white flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 m-2 rounded-xl w-[500px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1>{editMode ? "Edit Video" : "Upload Video"}</h1>
          <button
            onClick={() => setUpload(false)}
            className="text-white cursor-pointer rounded-full"
          >
            <IoIosCloseCircleOutline size={25} className="text-red-500" />
          </button>
        </div>

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

        <select
          name="videoType"
          value={formData.videoType}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        >
          <option value="youtube">YouTube Video</option>

          <option value="upload">Upload From Device</option>
        </select>

        {formData.videoType === "youtube" ? (
          <input
            type="text"
            name="videoUrl"
            placeholder="Paste YouTube Link"
            value={formData.videoUrl}
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 outline-none"
          />
        ) : (
          <input
            type="file"
            name="videoFile"
            accept="video/*"
            onChange={handleFileChange}
            className="p-3 rounded text-gray-400 bg-zinc-600 cursor-pointer"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-600 p-3 rounded hover:bg-red-700"
        >
          {loading
            ? editMode
              ? "Updating..."
              : "Uploading..."
            : editMode
              ? "Updated"
              : "Uploaded"}
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
