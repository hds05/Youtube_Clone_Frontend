import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import axios from "axios";
import { useSearch } from "../../context/SearchContext";

function VideoPlayer() {
  const { id } = useParams();
  console.log("ID from params:", id);

  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  const { searchText } = useSearch();

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/video/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesSearch;
  });
  if (!video) {
    return (
      <div className="text-white md:text-4xl text-center flex justify-center items-center h-screen">
        We are so sorry!!!🙆 <br /> Don't have this video...
      </div>
    );
  }
  return (
    <div className=" text-white min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {!video ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Loading...
                </div>
              ) : video.videoType === "youtube" ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoUrl}?autoplay=1&mute=1`}
                  title="video"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-full"
                  controls
                  src={`http://localhost:3000${video.videoUrl}`}
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-lg md:text-xl font-semibold">{video?.title}</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3 gap-4">
              <div className="flex items-center gap-3">
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
                <div>
                  <p className="font-medium">{video?.channelName}</p>
                  <p className="text-sm text-gray-400">
                    {video?.subscribers || "1k subscribers"}
                  </p>
                </div>
                <button className="ml-4 bg-white text-black px-4 py-1 rounded-full font-medium cursor-pointer">
                  Subscribe
                </button>
              </div>

              <div className="flex gap-3">
                <button className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer">
                  👍 <span className="border-l-1 pl-2"> {video?.likes}k</span>
                </button>
                <button className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer">
                  👎{" "}
                  <span className="border-l-1 pl-2"> {video?.dislikes}k</span>
                </button>
                <button className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer">
                  🔗 Share
                </button>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded-lg mt-4 text-sm text-gray-300">
              <p>{video?.description}</p>
            </div>

            <div>
              <Comments comments={video?.comments} videoId={video?._id} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[350px] bg-black/40 p-2 rounded-2xl flex flex-col gap-4">
          {filteredVideos.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (item?._id) {
                  navigate(`/video/${item._id}`);
                }
              }}
              className="flex gap-3 cursor-pointer"
            >
              <img
                src={item.thumbnailUrl}
                className="w-40 h-24 bg-gray-800 rounded-lg"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <p className="text-xs text-gray-400">{item.channelName}</p>
                <p className="text-xs text-gray-400">
                  {item?.views}k views • {item?.time}
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
