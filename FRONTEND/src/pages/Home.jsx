import React from 'react'
import { Student } from '../icons/Student'
import { ExamTypeCard } from '../components/ExamTypeCard'
import { StepsCard } from '../components/StepsCard'
import { useQuery } from '@tanstack/react-query'
import {capitalize} from "lodash"
import { useNavigate } from 'react-router-dom'
import { useExam } from '../context/ExamContext'
import { Fab } from '../components/Fab'


export const Home = () => {

 const {apiUrl} = useExam()

  

const {isLoading, error, data} = useQuery({
    queryKey: ["exams"],
    queryFn: async ()=>{ 
        const res = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/subjects/allSubjects`)
        if (!res.ok) {
              console.error("Fetch error:", res.status, res.statusText)
            throw new Error('Network response was not ok');
          }
        return res.json()
    }
}) 



// const {examTypes} = data
console.log(data?.examTypes)
    const Data = [
        {exam: "JAMB",
            meaning: "Joint Administration Matriculation Board",
            number: 2,
            subjects: ["English", "Mathematics"]
        },
        {exam: "WAEC",
            meaning: "West African Examinations Council",
            number: 2,
            subjects: ["Physics", "Chemistry"]
        }
    ]

    const steps = [
  {
    id: 1,
    title: "Select Exam",
    description: "Choose between JAMB or WAEC"
  },
  {
    id: 2,
    title: "Pick Subject & Topic",
    description: "Select the area you want to test"
  },
  {
    id: 3,
    title: "Answer Questions",
    description: "10 theory questions to complete"
  },
  {
    id: 4,
    title: "Get Results",
    description: "See your preparedness score"
  }
];

if (isLoading) return  <div className='flex items-center justify-center min-h-screen'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
if (error) return <p>Error: {error.message}</p>



  return (
    <div className='w-full'>


        <div className='text-center px-4 sm:px-0'>
            <p className='flex justify-center'>
              <Student className=''/>  
              
            </p>
            <p className='text-lg sm:text-xl md:text-2xl font-semibold mb-2'>Exam Preparedness Checker</p>
            <p className='mb-2 text-xs sm:text-sm md:text-base'>Test your knowledge and discover how prepared you are for your exams</p>
        </div>

        
        <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0'>
            {Object.entries(data?.examTypes).map(([examName, subjects]) => {
//  const formatedSubjects = subjects.map(subject => capitalize(subject))
              return   <ExamTypeCard  key={examName} title={examName.toUpperCase()} number={subjects.length} subjects={subjects.map(subject => capitalize(subject.subject))} meaning={examName.toLowerCase() === "jamb" ?  "Joint Administration Matriculation Board" : "West African Examinations Council"} />

            }

               
               
            )}
        </div>
        <section className='mt-6 sm:mt-8 md:mt-10 border-2 w-full sm:w-5/6 mx-auto py-4 sm:py-6 px-4 sm:px-0'>
            <h2 className='text-center text-lg sm:text-xl md:text-2xl font-semibold'>How It Works</h2>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-4'>
            {steps.map((step)=> (<StepsCard id={step.id} description={step.description} title={step.title}/>))}
        </div>
        </section>

     <Fab/>
        
    </div>
  )
}
