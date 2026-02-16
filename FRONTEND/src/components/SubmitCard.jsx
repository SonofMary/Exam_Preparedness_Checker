import React from 'react'

export const SubmitCard = ({handleSubmit, totalQuestions, attemptedQuestions}) => {
  const remainingQuestions = totalQuestions - attemptedQuestions
  return (
    <>
  <div className="card w-full bg-amber-50 card-lg shadow-sm border border-indigo-400 text-black">
          <div className="py-4 px-3 sm:py-6 sm:px-5 flex flex-col items-start gap-3 sm:gap-2">
            
            {/* Icon */}
            

            {/* Text */}
           <section className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-3 sm:gap-0">
  {/* Icon on the left */}
  <p className='flex gap-2 items-center text-xs sm:text-sm md:text-base'>
 Please Answer all {remainingQuestions} remaining questions
  </p>
 

  {/* Percentage text on the right */}
  <button className="btn btn-active btn-neutral btn-sm sm:btn-md w-full sm:w-auto" onClick={handleSubmit}>Submit Answers</button>
</section>
           

          </div>
         
        </div>
    </>
  )
}
