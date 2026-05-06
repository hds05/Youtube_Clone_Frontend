import React, { useEffect, useState } from 'react'
import VideoList from '../components/VideoList'
import axios from 'axios';
function HomePage() {
  const [categories, setCategories] = useState(["All"])
  const [selectedCategory, setSelectedCategory] = useState("All")
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/videos");

        // extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(
            res.data
              .map((video) => video.category)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        alert("failed to load videos");
      }
    };
    
    fetchVideos();
  }, []);
  
  // console.log(categories, "from homepage")

  return (
    <div>
      <div className='flex flex-wrap text-sm gap-4 p-4 text-white'>
        {categories.map((e) => (
          <button key={e} onClick={() => setSelectedCategory(e)} className={`p-1 md:p-2 rounded-md transition cursor-pointer ${selectedCategory === e ? 'bg-white text-black' : 'bg-gray-800 hover:bg-gray-700'}`}>{e}
          </button>
        ))}
      </div>
      <VideoList category={selectedCategory} />
    </div>
  )
}

export default HomePage