import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Channel from "../components/Channel";
import UploadVideo from "../components/UploadVideo";

function ChannelPage() {
  const { user, token } = useAuth();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [upload, setUpload] = useState(false)
  const navigate = useNavigate();

    function handleUpload(){
        setUpload(true)
    }

  useEffect(() => {
    axios
      .get("http://localhost:3000/channel/mychannel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChannel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setChannel(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (!channel) {
    return (
      <div className="text-white flex flex-col items-center justify-center h-screen">
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
      <div className="w-full h-40 rounded-xl mb-4 overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-colorful-music-festival-twitch-banner_23-2149065820.jpg"
          className="w-full h-full"
          alt=""
        />
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-20 md:w-40 h-20 md:h-40 rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold">
          {channel.channelName?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            {channel.channelName}
          </h1>
          <p className="text-gray-400">{channel.description}</p>
          <p className="text-gray-400 text-sm">
            {channel.subscribers} subscribers • 0 videos
          </p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-700 mb-6 pb-2 text-sm">
        <span className="border-b-2 border-white pb-1">Videos</span>
        <span className="text-gray-400">Shorts</span>
        <span className="text-gray-400">Live</span>
      </div>
      <div>
        <Channel />
      </div>
      <div>
        <button
          onClick={() => handleUpload()}
        //   onClick={() => navigate("/upload")}
          className="bg-red-600 text-white fixed bottom-2 right-2 md:bottom-10 md:right-10 p-6 rounded-full cursor-pointer"
        >
          <MdAdd />
        </button>
        {
            upload && <UploadVideo setUpload={setUpload}/>
        }
      </div>
    </div>
  );
}

export default ChannelPage;
