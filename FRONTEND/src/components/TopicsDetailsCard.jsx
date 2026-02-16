import React from 'react'
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {fetchExamTopicQuestions} from '../api/fetchExamSubject'

export const TopicsDetailsCard = ({title, subtopics, subject, exam}) => {

const navigate = useNavigate()
  return (
    <div>
         <div className="card w-full bg-amber-50 p-0 card-base shadow-sm border border-indigo-400">
                  <div className="card-body flex flex-col sm:flex-row items-start p-3 sm:p-4 text-black gap-3 sm:gap-4">
                    
                    {/* Icon */}
                    <IoDocumentTextOutline className="text-purple-600 text-xl sm:text-2xl mt-1 shrink-0" />
        
                    {/* Text */}
                    <div className="grow">
                      <h2 className="font-semibold text-base sm:text-lg mb-1">{title}</h2>
                       <p className="text-xs sm:text-sm">
                       {subtopics.join(", ")}
                      </p>
                      <p className='text-zinc-700 text-xs sm:text-sm'>
                        10 questions • Theory-based assessment
                      </p>
                    </div>

                    <button className="btn btn-xs sm:btn-sm md:btn-md btn-neutral shrink-0" onClick={()=> navigate(`/exam/${exam}/${subject}/${title}`)} >Start Test</button>
        
                  </div>
                </div>
    </div>
  )
}
