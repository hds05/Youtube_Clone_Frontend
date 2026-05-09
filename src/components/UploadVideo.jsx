import React, { useEffect, useState } from "react";
// import axios for APIs
import axios from "axios";
// useAuth hook used to get token from AuthContext
import { useAuth } from "../../context/AuthContext";
// Hook used for navigation between pages
import { useNavigate } from "react-router-dom";
// import close icon
import { IoIosCloseCircleOutline } from "react-icons/io";

function UploadVideo({
  setUpload,
  editMode = false,
  videoData,
  refreshVideos,
}) {
  // Get token from useAuth
  const { token } = useAuth();
  // for page navigation
  const navigate = useNavigate();

  // State to store form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    videoType: "youtube",
    videoUrl: "",
  });
  // State to store uploaded video file
  const [videoFile, setVideoFile] = useState(null);

  // Loading state while uploading/updating
  const [loading, setLoading] = useState(false);

  // Function to handle text input changes
  const handleChange = (e) => {
    // Updating formData state
    setFormData({
      ...formData,
      // Dynamic field update
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    // Store selected video file
    setVideoFile(e.target.files[0]);
  };

  // Function to extract YouTube video ID from full URL
  const extractYoutubeId = (url) => {
    try {
      // Regex to match youtube video id
      const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
      // Match url with regex
      const match = url.match(regExp);
      // Return matched ID
      return match ? match[1] : url;
    } catch (err) {
      // If error occurs return original url
      return url;
    }
  };

  // Function to upload or edit video
  const handleSubmit = async () => {
    // Checking required fields
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
      // start loading
      setLoading(true);

      let res;

      // create form data
      const form = new FormData();

      // append basic fields
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("thumbnailUrl", formData.thumbnailUrl);
      form.append("videoType", formData.videoType);

      // if youtube video
      if (formData.videoType === "youtube") {
        // append youtube video id
        form.append("videoUrl", extractYoutubeId(formData.videoUrl));
      } else {
        // check if file selected
        if (!videoFile) {
          alert("Please select a video file");
          return;
        }

        // append uploaded file
        form.append("video", videoFile);
      }

      // EDIT VIDEO
      if (editMode) {
        // API request to update video
        res = await axios.put(
          `http://localhost:3000/video/${videoData._id}/edit`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        alert("Video Updated Successfully");
      } else {
        
        // UPLOAD VIDEO
        // API request to upload video
        res = await axios.post("http://localhost:3000/upload", form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Video Uploaded Successfully");
      }

      // close modal
      setUpload(false);
    } catch (err) {
      console.log(err);

      // Show backend error if available
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      // stop loading
      setLoading(false);
    }
  };

  // Run when editMode or videoData changes
  useEffect(() => {
    // If editing existing video
    if (editMode && videoData) {
      // Fill form with old video data
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
          {/* Title changes based on mode */}
          <h1>{editMode ? "Edit Video" : "Upload Video"}</h1>

          {/* Close button */}
          <button
            onClick={() => setUpload(false)}
            className="text-white cursor-pointer rounded-full"
          >
            <IoIosCloseCircleOutline size={25} className="text-red-500" />
          </button>
        </div>

        {/* Title input field */}
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />
        {/* Description input field */}
        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        {/* Category input field */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        {/* Thumbnail Url input field */}
        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        />

        {/* Video type dropdown */}
        <select
          name="videoType"
          value={formData.videoType}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 outline-none"
        >
          {/* Select to upload youtube video */}
          <option value="youtube">YouTube Video</option>
          {/* Select to upload video from local system */}
          <option value="upload">Upload From Device</option>
        </select>

        {/* If youtube selected */}
        {formData.videoType === "youtube" ? (
          // Show youtube URL input
          <input
            type="text"
            name="videoUrl"
            placeholder="Paste YouTube Link"
            value={formData.videoUrl}
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 outline-none"
          />
        ) : (
          // Otherwise show file input
          <input
            type="file"
            name="videoFile"
            // Accept only video files
            accept="video/*"
            onChange={handleFileChange}
            className="p-3 rounded text-gray-400 bg-zinc-600 cursor-pointer"
          />
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          // Disable button while loading
          disabled={loading}
          className="bg-red-600 p-3 rounded hover:bg-red-700 cursor-pointer"
        >
          {loading
            ? editMode
              ? "Updating..."
              : "Uploading..."
            : editMode
              ? "Update"
              : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
