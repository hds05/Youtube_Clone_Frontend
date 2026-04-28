import React, { useState } from 'react'
import VideoList from '../components/VideoList'

function HomePage() {
  const categories = ["All", "Music", "Bhajan", "Gaming", "Coding", "News", "Live"]
  const [selectedCategory, setSelectedCategory] = useState("All")

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