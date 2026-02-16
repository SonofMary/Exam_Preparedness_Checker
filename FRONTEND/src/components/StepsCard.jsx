import React from 'react'

export const StepsCard = ({id, title, description}) => {
  return (
    <div className='flex justify-center flex-col items-center gap-2 text-xs sm:text-sm md:text-base px-2'>

  
    <h2 className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-600 text-white flex items-center justify-center rounded-full font-semibold text-sm sm:text-base">{id}</h2>
    <p className="font-semibold text-center">{title}</p>
    <div className="text-center">
      <p className="w-full text-xs sm:text-sm">{description}</p>
    </div>
  

    </div>
  )
}
