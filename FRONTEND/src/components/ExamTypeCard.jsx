import React from 'react'
import {} from 'react-icons'
import { Book } from '../icons/Book'
import { useNavigate } from 'react-router-dom'
import { FaCircle } from "react-icons/fa";

export const ExamTypeCard = ({meaning, title, number, subjects}) => {

    const navigate = useNavigate()
  return (
    <>
        <div className="card bg-base-100 w-full sm:w-80 md:w-96 shadow-sm hover:border-blue-900 border-2 transition-all ease-in-out">
  <div className="card-body">
    <h2 className="card-title text-lg sm:text-xl"><span ><Book/></span>{title}</h2>
    
    <p className="text-sm sm:text-base">{meaning}</p>
    <p className="text-sm sm:text-base">{number} Subjects available</p>
    <p className="text-xs sm:text-sm"> Subjects include {subjects.join(", ")} </p>
    <div className="card-actions w-full">
      <button className="btn btn-primary w-full btn-sm sm:btn-md" onClick={()=> navigate(`exam/${title.toLowerCase()}`)}>Start Now</button>
    </div>
  </div>
</div>
    </>
  )
}
