import React from 'react'
import { BackTo } from '../components/BackTo'
import { useParams, useNavigate} from 'react-router-dom'
import { useQuery, useQueryClient} from '@tanstack/react-query'
import {fetchExams, fetchExamTopics} from "../api/fetchExamSubject"
import { ExamDetailCard } from '../components/ExamDetailCard'


export const ExamTypeDetails = () => {



    const catchedData = useQueryClient().getQueriesData(["exams"])

    const {data, isLoading, error} = useQuery({
        queryKey: ["exam"],
        queryFn: fetchExams,
        // initialData: catchedData

    })




    const navigate = useNavigate()
    const {examType} = useParams()

   if (isLoading)  return  <div className='flex items-center justify-center min-h-screen'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
   if (error) return <p className='text-center text-red-500'>{error.message}</p>

    const subjects = data?.examTypes?.[examType]

    console.log(subjects, "subjects")
  return (
    <div className='mx-auto w-full sm:w-5/6 px-4 sm:px-0'>
        <BackTo onClick={() => navigate(`/`)} />
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-0'>{examType.toUpperCase()} Subjects</h1>
        <p className='text-sm sm:text-base md:text-lg mt-2'>Select a subject to begin your preparedness test</p>
        <div className='flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6'>
            {subjects.map((subject) => (
                <ExamDetailCard number={subject.topics.length} topics={subject.topics.map(topic => topic.title)} subject={subject.subject} exam={examType}/>
            ))}
        </div>




    </div>
  )
}
