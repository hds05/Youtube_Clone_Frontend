import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import Loader from './Loader';

function VideoList({ category }) {
    const [videos, setVideos] = useState([])
    const { searchText } = useSearch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const data = async () => {
            try {
                setLoading(true)
                const res = await axios.get("http://localhost:3000/videos")
                setVideos(res.data)
            } catch (err) {
                console.log(err.message);
                alert(err.message)
            } finally {
                setLoading(false)
            }
        }
        data()
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
        <>
            {
                loading ? <div><Loader /></div>
                    :
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
                        {
                            filteredVideos.map((e) => (
                                <VideoCard key={e.videoId} data={e} />
                            ))
                        }
                    </div>
            }
        </>
    )
}

export default VideoList