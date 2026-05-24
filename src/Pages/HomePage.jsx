import React, { useEffect, useState } from "react";
// Import VideoList component for displaying video cards
import VideoList from "../components/VideoList";
// Import axios for API requests
import axios from "axios";
function HomePage() {
  // BASE_URL variable for API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // State for storing all categories
  const [categories, setCategories] = useState(["All"]);
  // State for currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // API request to get all videos
        const res = await axios.get(`${BASE_URL}/videos`);

        // extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(res.data.map((video) => video.category).filter(Boolean)),
        ];
        // Store categories in state
        setCategories(uniqueCategories);
      } catch (err) {
        // Show error alert if request fails
        alert("failed to load videos and fetch the categories...");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {/* Category buttons */}
      <div className="flex flex-wrap text-sm gap-4 p-4 text-white">
        {categories.map((e) => (
          <button
            key={e}
            // Set selected category on click
            onClick={() => setSelectedCategory(e)}
            className={`p-1 md:p-2 rounded-md transition cursor-pointer ${selectedCategory === e ? "bg-white text-black" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {e}
          </button>
        ))}
      </div>
      {/* Show videos according to selected category */}
      <VideoList category={selectedCategory} />
    </div>
  );
}

export default HomePage;
