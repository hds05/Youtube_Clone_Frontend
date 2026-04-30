import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';

function VideoList({ category }) {
    const [videos, setVideos] = useState([])
    const { searchText } = useSearch()

    useEffect(() => {
        axios.get("http://localhost:3000/videos")
            .then(res => setVideos(res.data))
            .catch(err => console.log(err))
    }, []);
    const filteredVideos = videos.filter((video) => {
        const matchesCategory =
            category === "All" ||
            video.category?.toLowerCase() === category.toLowerCase()

        const matchesSearch =
            video.title?.toLowerCase().includes(searchText.toLowerCase())

        return matchesCategory && matchesSearch
    })
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