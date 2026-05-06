import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import VideoCard from "../components/VideoCard";
import Loader from "./Loader";

function Channel() {
  const { token } = useAuth();

  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchMyVideos();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-white p-4">
      {videos ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} data={video} />
          ))}
        </div>
      ) : (
        <p>No videos uploaded yet</p>
      )}
    </div>
  );
}

export default Channel;
