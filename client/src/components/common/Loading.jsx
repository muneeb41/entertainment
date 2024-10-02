import React from 'react'

const Loading = () => {
  return (
    // this show only when app fetching resources from server
    <div className="flex items-center justify-center  ">
  <div className="relative">
    {/* Outer circle */}
    <div className="w-24 h-24 border-8 border-t-transparent border-blue-500 rounded-full animate-spin shadow-lg glow"></div>

    {/* Middle circle */}
    <div className="absolute top-1/2 left-1/2 w-16 h-16 border-8 border-t-transparent border-green-400 rounded-full animate-spin-slow shadow-md glow transform -translate-x-1/2 -translate-y-1/2"></div>

    {/* Inner circle */}
    <div className="absolute top-1/2 left-1/2 w-8 h-8 border-8 border-t-transparent border-orange-500 rounded-full animate-spin-reverse shadow-sm glow transform -translate-x-1/2 -translate-y-1/2"></div>

    {/* Center dot */}
    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full shadow transform -translate-x-1/2 -translate-y-1/2"></div>

    {/* Loading Text */}
    <div className="absolute top-1/2 left-1/2 text-blue-600 font-bold text-4xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
      Loading...
    </div>
  </div>
</div>
  )
}

export default Loading