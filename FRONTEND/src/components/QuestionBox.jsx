import React from 'react'
import { capitalize } from 'lodash'
import { useState, useRef } from 'react'
import { useExam } from '../context/ExamContext'

export const QuestionBox = ({difficulty, question, index, handleSubmit}) => {

  const {answers, setAnswers} = useExam()


  const textAreaRef = useRef(null)
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {

    const value = e.target.value

    setCharCount(textAreaRef.current.value.length)

    setAnswers(prev => ({
      ...prev,
      [index]: value.trim() !== "" ? value : "no answer"
    }))

    

  }
  
  return (
    <>
      <div className="card w-full bg-base-100 card-lg shadow-sm border border-indigo-400 py-4 px-3 sm:px-6">
        <section className='flex flex-wrap items-center gap-2 sm:gap-3'>
            <h2 className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-600 flex items-center justify-center rounded-full text-white text-sm sm:text-base font-semibold">{index}</h2>
            <div className={`badge badge-outline text-xs sm:text-sm ${difficulty === `easy` && `bg-green-400 text-green-900`} ${difficulty === `medium` && `bg-amber-200 text-amber-800`} ${difficulty === `hard` && `bg-orange-300 text-orange-950`} ${difficulty === `advanced` && `bg-red-300 text-red-950`}`}>{capitalize(difficulty)}</div>
        </section>

        <section>

            <fieldset className="fieldset">
  <legend className="fieldset-legend text-sm sm:text-base md:text-lg">{question}</legend>
  <textarea ref={textAreaRef} className="textarea h-24 sm:h-28 md:h-32 w-full text-sm sm:text-base" placeholder="Type your answer here..." onChange={handleChange}></textarea>
  <div className="label text-xs sm:text-sm">{charCount} characters</div>
</fieldset>
        </section> 
                   
        </div>
          
                    
                  

    </>
  )
}
