import React from 'react';

const CircleProgress = ({ percentage }) => {
    let color = '#53f57e'
    // this component change its color according to given percentage 
    if(percentage >=70){
        color = '#53f57e' // green
    }else if(percentage >=50){
        color = "#f7c65c"  // orange-yellow
    }else{
        color = "#f55045"  // lite-red
    }
  return (
    // this component show movie and tv show rating in percentage 
    <div className='relative bottom-5 left-2 '>
      <div className="relative rounded-full bg-black h-9 w-9 z-10 xl:h-11 xl:w-11">
        <div
          className="absolute top-0 left-0 rounded-full h-9 w-9 z-20 p-1 xl:h-11 xl:w-11"
          style={{
            background: `conic-gradient(${color} ${percentage}%, gray ${percentage}%)`
          }}
        >
          <div className={`flex justify-center items-center rounded-full h-7 w-7 xl:h-9 xl:w-9 bg-black `}
            style={{
                color: color
            }}
          >
            {percentage}<span className='text-[10px]'>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleProgress;
