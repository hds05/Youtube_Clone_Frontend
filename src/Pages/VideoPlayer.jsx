import React from 'react'
import { videos } from '../assets/dummydata'
import { useNavigate, useParams } from 'react-router-dom'

function VideoPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()

  const filtered = videos.find((e) => e.videoId === id)
  return (
    <div className=" text-white min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1">
          <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              title="video"
              allowFullScreen
              allow='autoplay'
            ></iframe>
          </div>
        </div>

        <div>
          {/* make comment section here */}
        </div>

        <div className="w-full lg:w-[350px] flex flex-col gap-4">
          {videos.map((item) => (
            <div key={item.videoId} onClick={() => navigate(`/video/${item.videoId}`)} className="flex gap-3 cursor-pointer">
              <img src={item.thumbnailUrl} className="w-40 h-24 bg-gray-800 rounded-lg" />
              <div className="flex flex-col">
                <p className="text-sm font-medium line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">{item.channelId}</p>
                <p className="text-xs text-gray-400">{item?.views} • {item?.time}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default VideoPlayer