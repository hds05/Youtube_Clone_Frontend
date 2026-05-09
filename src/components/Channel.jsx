import React, { useEffect, useState } from "react";
// axios for APIs
import axios from "axios";
// useAuth for Authentication
import { useAuth } from "../../context/AuthContext";
// VideoCard component for show videos as card in channel page.
import VideoCard from "../components/VideoCard";
// Loader component for loading
import Loader from "./Loader";
// UploadVideo component used for editing videos
import UploadVideo from "./UploadVideo";

function Channel() {
  // Getting token from AuthContext
  const { token } = useAuth();

  // State to store all uploaded videos
  const [videos, setVideos] = useState([]);
  // State to store currently selected video for editing
  const [editVideo, setEditVideo] = useState(null);
  // Loading state while fetching videos
  const [loading, setLoading] = useState(true);
  // State to track which video's menu is open
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchMyVideos = async () => {
    try {
      // API request to get logged in user's videos
      const res = await axios.get("http://localhost:3000/myvideos", {
        headers: {
          // Sending token for protected route
          Authorization: `Bearer ${token}`,
        },
      });

      // Store videos in state
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      // Stop loading after API completes
      setLoading(false);
    }
  };

  // RUN ON COMPONENT LOAD
  useEffect(() => {
    fetchMyVideos();
  }, []);

  const deleteVideo = async (id) => {
    try {
      // API request to delete video
      await axios.delete(`http://localhost:3000/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted video from frontend state
      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      console.log("Not able to delete:", err.message);
    }
  };

  // Show loader while fetching videos
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-white p-4">
      {videos.length > 0 ? (
        // Grid layout for videos
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((video) => (
            <div key={video._id} className="relative group flex flex-col">
              {/* 3 dots menu button */}
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === video._id ? null : video._id)
                }
                // Hidden normally and visible on hover
                className="absolute top-1 right-0 bg-black text-white cursor-pointer px-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ≡
              </button>
              {/* Dropdown menu */}
              {openMenuId === video._id && (
                <div className="absolute top-8 right-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                  {/* Edit button */}
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-800 w-full text-left"
                    onClick={() => {
                      setEditVideo(video);
                      // Close menu
                      setOpenMenuId(null);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className="block px-4 py-2 text-sm hover:bg-red-600 w-full text-left"
                    onClick={() => {
                      // Delete selected ID
                      deleteVideo(video._id);
                      // Close Menu
                      setOpenMenuId(null);
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
              {/* Video card */}
              <VideoCard data={video} />
            </div>
          ))}
          {/* Edit video fields */}
          {editVideo && (
            <UploadVideo
              // Used to close
              setUpload={setEditVideo}
              // Tells component that this is edit mode
              editMode={true}
              // Sending selected video data
              videoData={editVideo}
              // Refresh videos after updating
              refreshVideos={fetchMyVideos}
            />
          )}
        </div>
      ) : (
        <p>No videos uploaded yet</p>
      )}
    </div>
  );
}

export default Channel;
