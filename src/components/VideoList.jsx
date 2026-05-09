import React, { useEffect, useState } from "react";

// import video card component to display each video
import VideoCard from "./VideoCard";
// import axios for making APIs requests
import axios from "axios";
// Import search context for filtering videos
import { useSearch } from "../../context/SearchContext";
// Import loader component while videos are fetching
import Loader from "./Loader";

function VideoList({ category }) {
  // State to store all fetched videos
  const [videos, setVideos] = useState([]);
  // Getting search text from SearchContext
  const { searchText } = useSearch();
  // Loading state while API request is running
  const [loading, setLoading] = useState(false);

  // Fetch all videos when component mounts
  useEffect(() => {
    // Async function for fetching videos
    const data = async () => {
      try {
        setLoading(true);
        // API request to fetch videos
        const res = await axios.get("http://localhost:3000/videos");
        // Store fetched videos in state
        setVideos(res.data);
      } catch (err) {
        // Show alert on error
        alert(err.message);
      } finally {
        // Stop loader after API finishes
        setLoading(false);
      }
    };
    data();
  }, []);

  // Filter videos based on category and search input
  const filteredVideos = videos.filter((video) => {
    // Check if selected category matches
    const matchesCategory =
      category === "All" ||
      video.category?.toLowerCase() === category.toLowerCase();

    // Check if title matches search text
    const matchesSearch = video.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    // Return videos matching both conditions
    return matchesCategory && matchesSearch;
  });
  return (
    <>
      {loading ? (
        // Show loader while fetching videos
        <div>
          <Loader />
        </div>
      ) : (
        // Grid layout for displaying videos
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {/* Mapping filtered videos */}
          {filteredVideos.map((e) => (
            // Render VideoCard for each video
            <VideoCard key={e._id} data={e} />
          ))}
        </div>
      )}
    </>
  );
}

export default VideoList;
