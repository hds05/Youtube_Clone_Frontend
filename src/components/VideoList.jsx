import React from 'react'
import VideoCard from './VideoCard'
import { videos } from '../assets/dummydata'

function VideoList({ category }) {

    const filteredVideos = category === "All" ? videos : videos.filter((e) => e.category?.toLowerCase() === category.toLowerCase())
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
            {
                filteredVideos.map((e) => (
                    <VideoCard key={e.videoId} data={e} />
                ))
            }
        </div>
    )
}

export default VideoList