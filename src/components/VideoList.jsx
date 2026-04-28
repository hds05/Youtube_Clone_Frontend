import React from 'react'
import VideoCard from './VideoCard'
import { videos } from '../assets/dummydata'

function VideoList() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
            {
                videos.map((e) => {
                    return <div key={e.videoId}>
                        <VideoCard data={e} />
                    </div>
                })
            }
        </div>
    )
}

export default VideoList