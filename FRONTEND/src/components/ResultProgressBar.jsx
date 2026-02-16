import React from 'react'

export const ResultProgressBar = ({percentage, difficulty, }) => {
  return (
    <div className="w-full">
        <progress className={`progress w-full sm:w-96 h-4 sm:h-6 ${difficulty === `easy` && `progress-success`} ${difficulty === `medium` && `progress-warning`} ${difficulty === `hard` && `progress-error`} ${difficulty === `advanced` && `progress-error`}`}  max="100" min="0" value={percentage}></progress>
    </div>
  )
}
