import React, { useEffect, useState } from "react";
// Import authentication context
import { useAuth } from "../../context/AuthContext";
// Import axios for API requests
import axios from "axios";
// import navigation tools for navigation
import { Link } from "react-router-dom";
// Import Loader, Channel & UploadVideo components
import Loader from "../components/Loader";
import Channel from "../components/Channel";
import UploadVideo from "../components/UploadVideo";
// import icon
import { MdAdd } from "react-icons/md";

function ChannelPage() {
  // BASE_URL variable for API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // Get token from Context
  const { token } = useAuth();
  // state to store channel data
  const [channel, setChannel] = useState(null);
  // Loading state while fetching the data
  const [loading, setLoading] = useState(true);
  // State for upload modal
  const [upload, setUpload] = useState(false);
  
  // Function to open upload modal
  function handleUpload() {
    setUpload(true);
  }

  // Fetch logged in user's channel data on component mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/channel/mychannel`, {
        headers: {
          // Send JWT token
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Store channel data in state
        setChannel(res.data);
        // stop loading
        setLoading(false);
      })
      .catch((err) => {
        // If channel doesn't exist, set null
        setChannel(null);
        // set loading false
        setLoading(false);
      });
  }, [token]);

  // Show loader while data is fetching
  if (loading) return <Loader />;

  // If user has no channel
  if (!channel) {
    return (
      <div className="text-white flex flex-col items-center justify-center h-screen">
        {/* Message with button to create channel*/}
        <h1 className="text-2xl mb-4">You don’t have a channel yet</h1>
        <Link
          to={"/createChannel"}
          className="bg-blue-600 px-4 py-2 rounded-full cursor-pointer"
        >
          Create Channel
        </Link>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen p-4">
      {/* Static channel banner */}
      <div className="w-full h-40 rounded-xl mb-4 overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-colorful-music-festival-twitch-banner_23-2149065820.jpg"
          className="w-full h-full"
          alt=""
        />
      </div>

      <div className="flex items-start gap-4 mb-6">
      {/* Channel icon */}
        <div className="w-20 md:w-40 h-20 md:h-40 rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold">
          {channel.channelName?.charAt(0).toUpperCase()}
        </div>

        <div>
          {/* Channel Name */}
          <h1 className="text-2xl md:text-4xl font-semibold">
            {channel.channelName}
          </h1>
          {/* Chanel description */}
          <p className="text-gray-400">{channel.description}</p>
           {/* Subscribers and total videos (The count of videos are static for now)*/}
          <p className="text-gray-400 text-sm">
            {channel.subscribers} subscribers • 0 videos  
          </p>
        </div>
      </div>

      {/* Static channel navigation tabs */}
      <div className="flex gap-6 border-b border-gray-700 mb-6 pb-2 text-sm">
        <span className="border-b-2 border-white pb-1">Videos</span>
        <span className="text-gray-400">Shorts</span>
        <span className="text-gray-400">Live</span>
      </div>
      {/* Render uploaded videos */}
      <div>
        <Channel />
      </div>

      {/* upload button */}
      <div>
        <button
          onClick={() => handleUpload()}
          className="bg-red-600 text-white fixed bottom-2 right-2 md:bottom-10 md:right-10 p-6 rounded-full cursor-pointer"
        >
          <MdAdd />
        </button>
        {upload && <UploadVideo setUpload={setUpload} />}
      </div>
    </div>
  );
}

export default ChannelPage;
