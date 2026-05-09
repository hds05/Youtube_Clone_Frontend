import React from 'react'
import { useNavigate } from 'react-router-dom'

function VideoCard({data}) {
    // for navigation
    const navigate = useNavigate()
    return (
        // Navigate to videoPlayer page on click for selected video
        <div onClick={() => navigate(`/video/${data._id}`)} className='text-white hover:bg-gray-800 p-2 rounded-2xl cursor-pointer'>
            {/* Thumbnail */}
            <div className='h-[150px] '>
                <img src={data.thumbnailUrl} alt="" className='w-full h-full rounded-2xl' />
            </div>
            {/* Title */}
            <h1 className='text-[15px] font-bold'>{data.title}</h1>
            {/* Channel name */}
            <h2 className='text-xs'>{data.channelName}</h2>
            {/* Views and upload time */}
            <h2 className='text-[10px]'>{data.views}k views | {data.time}</h2>
        </div>
    )
}

export default VideoCard