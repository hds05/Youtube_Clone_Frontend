import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import VideoCard from "../components/VideoCard";
import Loader from "./Loader";
import UploadVideo from "./UploadVideo";

function Channel() {
  const { token } = useAuth();

  const [videos, setVideos] = useState([]);
  const [editVideo, setEditVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchMyVideos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/myvideos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVideos(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyVideos();
  }, [videos]);

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      console.log("Not able to delete:", err.message);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-white p-4">
      {videos ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((video) => (
            <div key={video._id} className="relative group flex flex-col">
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === video._id ? null : video._id)
                }
                className="absolute top-1 right-0 bg-black text-white cursor-pointer px-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ⋮
              </button>
              {openMenuId === video._id && (
                <div className="absolute top-8 right-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-800 w-full text-left"
                    onClick={() => {
                      setEditVideo(video);
                      setOpenMenuId(null);
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="block px-4 py-2 text-sm hover:bg-red-600 w-full text-left"
                    onClick={() => {
                      deleteVideo(video._id);
                      setOpenMenuId(null);
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              )}

              <VideoCard data={video} />
            </div>
          ))}
          {editVideo && (
            <UploadVideo
              setUpload={setEditVideo}
              editMode={true}
              videoData={editVideo}
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
