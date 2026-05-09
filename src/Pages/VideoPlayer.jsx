import React, { useEffect, useState } from "react";
// importing routing hooks
import { Link, useNavigate, useParams } from "react-router-dom";
// importing Comments component
import Comments from "../components/Comments";
// importing axios for API requests
import axios from "axios";
// importing custom search context
import { useSearch } from "../../context/SearchContext";
// importing useAuth to get token
import { useAuth } from "../../context/AuthContext";

function VideoPlayer() {
  // getting video id from URL params
  const { id } = useParams();
  // getting token for authentication
  const { token } = useAuth();
  // hook used for navigation
  const navigate = useNavigate();
  // state to store currently playing video
  const [video, setVideo] = useState(null);
  // state to store all videos
  const [videos, setVideos] = useState([]);
  // getting search text from context
  const { searchText } = useSearch();
  // for loading state
  const [loading, setLoading] = useState(true);

  // fetching current video and all videos whenever id changes
  useEffect(() => {
    // if no id is found then stop execution
    if (!id) return;
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // fetching single video details
        const videoRes = await axios.get(`http://localhost:3000/video/${id}`);

        setVideo(videoRes.data);

        // fetching all videos
        const videosRes = await axios.get("http://localhost:3000/videos");
        setVideos(videosRes.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        // stop loading
        setLoading(false);
      }
    };
    fetchVideos();
  }, [id]);

  // filtering videos according to search text
  const filteredVideos = videos.filter((video) => {
    // checking if title matches search input
    const matchesSearch = video.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesSearch;
  });

  // showing loading state
  if (loading) {
    return (
      <div className="text-white text-3xl flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // showing fallback UI if video is not found
  if (!video) {
    return (
      <div className="text-white md:text-4xl text-center flex justify-center items-center h-screen">
        We are so sorry!!!🙆 <br /> Don't have this video...
      </div>
    );
  }

  // function to like video
  const handleLike = async () => {
    try {
      if (!token) {
        const confirmLogin = window.confirm(
          "Please login first to like this video 😊",
        );
        if (confirmLogin) {
          navigate("/login");
        }
        return;
      }
      const res = await axios.put(
        `http://localhost:3000/video/${video._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // updating video state instantly
      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  // function to dislike video
  const handleDislike = async () => {
    try {
      if (!token) {
        const confirmLogin = window.confirm(
          "Don't like this video? Sign in to make your opinion count.",
        );
        if (confirmLogin) {
          navigate("/login");
        }
        return;
      }
      const res = await axios.put(
        `http://localhost:3000/video/${video._id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // updating video state instantly
      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className=" text-white min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {/* showing loading state if video is not loaded */}
              {!video ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Loading...
                </div>
              ) : video.videoType === "youtube" ? (
                // rendering youtube iframe if video type is youtube
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoUrl}?autoplay=1&mute=1`}
                  title="video"
                  allowFullScreen
                />
              ) : (
                // rendering uploaded/local video player
                <video
                  className="w-full h-full"
                  controls
                  src={`http://localhost:3000${video.videoUrl}`}
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            {/* Video title */}
            <h1 className="text-lg md:text-xl font-semibold">{video?.title}</h1>

            {/* channel and action buttons section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3 gap-4">
              <div className="flex items-center gap-3">
                {/* chanel icon */}
                <div className="w-10 md:w-15 h-10 md:h-15 rounded-full bg-red-600 flex items-center justify-center md:text-3xl font-bold">
                  {video?.channelIcon ? (
                    <img
                      src={video?.channelIcon}
                      alt="channelIcon"
                      className="rounded-full"
                    />
                  ) : (
                    video.channelName?.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Channel name */}
                <div>
                  <p className="font-medium">{video?.channelName}</p>
                  <p className="text-sm text-gray-400">
                    {video?.subscribers || "1k subscribers"}
                  </p>
                </div>

                {/* Static subscribe button */}
                <button className="ml-4 bg-white text-black px-4 py-1 rounded-full font-medium cursor-pointer">
                  Subscribe
                </button>
              </div>

              <div className="flex gap-3">
                {/* Static like button */}
                <button
                  onClick={handleLike}
                  className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer"
                >
                  👍 <span className="border-l-1 pl-2"> {video?.likes}</span>
                </button>
                {/* Static dislike button */}
                <button
                  onClick={handleDislike}
                  className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer"
                >
                  👎
                  <span className="border-l-1 pl-2"> {video?.dislikes}</span>
                </button>
                {/* Static Share button */}
                <button className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer">
                  🔗 Share
                </button>
              </div>
            </div>

            {/* Channel description */}
            <div className="bg-gray-900 p-3 rounded-lg mt-4 text-sm text-gray-300">
              <p>{video?.description}</p>
            </div>

            {/* Comment section */}
            <div>
              <Comments comments={video?.comments} videoId={video?._id} />
            </div>
          </div>
        </div>

        {/* right sidebar for recomended videos */}
        <div className="w-full lg:w-[350px] bg-black/40 p-2 rounded-2xl flex flex-col gap-4">
          {/* mapping filtered videos */}
          {filteredVideos.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (item?._id) {
                  // navigate to clicked video
                  navigate(`/video/${item._id}`);
                }
              }}
              className="flex gap-3 cursor-pointer"
            >
              {/* Video thumbnail */}
              <img
                src={item.thumbnailUrl}
                className="w-40 h-24 bg-gray-800 rounded-lg"
              />
              <div className="flex flex-col">
                {/* Title */}
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                {/* Channel name */}
                <p className="text-xs text-gray-400">{item.channelName}</p>
                {/* views and time(when uploaded) of the video */}
                <p className="text-xs text-gray-400">
                  {item?.views}k views • {item?.uploadDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
