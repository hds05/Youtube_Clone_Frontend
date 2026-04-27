import React from 'react'

function VideoCard({data}) {
    return (
        <div className='text-white hover:bg-gray-800 p-2 rounded-2xl cursor-pointer'>
            <div>
                <img src={data.thumbnailUrl} alt="" className='w-full rounded-2xl' />
            </div>
            <h1 className='text-[15px] font-bold'>{data.title}</h1>
            <h2 className='text-xs'>{data.channelId}</h2>
            <h2 className='text-[10px]'>{data.views} {data.time}</h2>
        </div>
    )
}

export default VideoCard