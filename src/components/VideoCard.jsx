import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function VideoCard({data}) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/video/${data.videoId}`)} className='text-white hover:bg-gray-800 p-2 rounded-2xl cursor-pointer'>
            <div className='h-[150px] '>
                <img src={data.thumbnailUrl} alt="" className='w-full h-full rounded-2xl' />
            </div>
            <h1 className='text-[15px] font-bold'>{data.title}</h1>
            <h2 className='text-xs'>{data.channelId}</h2>
            <h2 className='text-[10px]'>{data.views}k views | {data.time}</h2>
        </div>
    )
}

export default VideoCard