import React from 'react'
import VideoCard from './VideoCard'
import { videos } from '../assets/dummydata'

function VideoList() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
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