import React from 'react'
import { Book } from '../icons/Book'
import { FaCircle } from "react-icons/fa";
import {capitalize} from "lodash"
import { useNavigate } from 'react-router-dom';

export const ExamDetailCard = ({number, topics, subject, exam}) => {

    const navigate = useNavigate()
  return (
    <div>
          <div className="card bg-base-100 w-full sm:w-80 md:w-96 shadow-sm hover:border-blue-900 border-2 transition-all ease-in-out">
          <div className="card-body">
            <h2 className="card-title text-lg sm:text-xl"><span ><Book/></span>{capitalize(subject)}</h2>
            
            {/* <p>{meaning}</p> */}
            <p className="text-sm sm:text-base">{number} Topics available</p>
            <div className="text-xs sm:text-sm"> Topics include {topics.map((topic, index) => (<p key={index} className='flex items-center mt-0.5'><FaCircle className='text-xs text-purple-400 scale-50'/> {topic}</p>))} </div>
            <div className="card-actions w-full">
              <button className="btn btn-primary w-full btn-sm sm:btn-md" onClick={()=> navigate(`/exam/${exam}/${subject}`)}>Start Now</button>
            </div>
          </div>
        </div>
    </div>
  )
}
