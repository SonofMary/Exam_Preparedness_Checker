import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { BackTo } from '../components/BackTo'
import { capitalize, set } from 'lodash'
import { FiCheckCircle } from "react-icons/fi";
import { GrCircleInformation } from "react-icons/gr";
import { FaCircle } from 'react-icons/fa'
import { SubmitCard } from '../components/SubmitCard'
import { QuestionBox } from '../components/QuestionBox'
import { fetchExamTopicQuestions } from '../api/fetchExamSubject'
import { useExam } from '../context/ExamContext'



export const TopicQuestions = () => {

  const {setAnswers, answers, result, setResult, submitting, setSubmitting } = useExam()
  const navigate = useNavigate()

    const {topic, examType, subject} = useParams()
    
    // Clear answers when topic changes
    useEffect(() => {
      setAnswers({})
    }, [topic, examType, subject, setAnswers])
    
     const {data, isLoading, error} = useQuery({
        queryKey: ["questions", examType, subject, topic],
        queryFn: ()=> fetchExamTopicQuestions(examType, subject, topic),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1

    })


//     const mutation = useMutation({
//   mutationFn: async (submittedData) => {
//     const res = await fetch(
//       `http://localhost:3000/topics/result/${examType}/${subject}/${topic}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ submissions: submittedData })
//       }
//     )

//     return res.json()
//   },
//   onSuccess: (data) => {
//     // After successful grading
// setResult(data)
//     navigate(`/${examType}/${subject}/${topic}/results`, { state: { result: data } })
//     console.log(data)

//   }
// })


    if(isLoading) {
        return <div className='flex flex-col items-center justify-center min-h-screen'>
            <span className="loading loading-infinity loading-xl"></span>
            <span>Loading questions...</span>
        </div>
    }

    const questions = data?.data?.questions

    const totalQuestions = questions.length

    const attemptedQuestions = Object.keys(answers).filter(answer => answer && answer !== "no answer").length

    const completionPercentage = Math.round((attemptedQuestions / totalQuestions) * 100)

  
    const handleSubmit = async () => {
 const submittedData = questions.map((question, index) => ({
      question: question.question,
      difficulty: question.difficulty,
      model_answer: question.model_answer,
      user_answer: answers[index + 1] || "no answer"
    }))

    console.log("Submitted answers:", submittedData)
    setSubmitting(submittedData)



navigate(`/exam/${examType}/${subject}/${topic}/results`)
  // mutation.mutate(submittedData)
    }
   

    
  return (
    <div>
  <div className="mx-auto w-full sm:w-5/6 px-4 sm:px-0">
  <BackTo onClick={() => window.history.back()} />
      <h1 className="text-3xl">{topic}</h1>
      <p className="text-lg">Answer all 10 questions to see your preparedness score</p>

      <div className="mt-4 lg:sticky lg:top-5 z-10">
        <div className="card w-full bg-amber-50 card-lg shadow-sm  border border-indigo-400 text-black">
          <div className="py-6 px-5 flex flex-col items-start gap-2">
            
            {/* Icon */}
            

            {/* Text */}
           <section className="flex w-full items-center">
  {/* Icon on the left */}
  <p className='flex gap-2 items-center'>
 <FiCheckCircle className="text-xl text-purple-700" /> {attemptedQuestions} out of {totalQuestions}
  </p>
 

  {/* Percentage text on the right */}
  <p className="ml-auto">{completionPercentage}% complete</p>
</section>
            <progress className="progress progress-primary w-full" value={completionPercentage} max="100"></progress>
           

          </div>
         
        </div>
      </div>
{/* ------------- */}
       <div className="mt-4 sm:mt-6">
              <div className="card w-full bg-base-100 card-lg shadow-sm border border-indigo-400">
                <div className="card-body flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-6">
                  
                  {/* Icon */}
                  <GrCircleInformation className="text-purple-600 text-xl sm:text-2xl mt-1 shrink-0" />
      
                  {/* Text */}
                  <div className="grow">
                    <h2 className="font-semibold mb-2 text-base sm:text-lg">Instructions</h2>
                    <div className="space-y-2">
                        <p className='flex items-center gap-2 text-xs sm:text-sm'><FaCircle className='text-xs text-purple-400 scale-50 shrink-0'/> Answer all questions thoroughly and in your own words</p>
                        <p className='flex items-center gap-2 text-xs sm:text-sm'><FaCircle className='text-xs text-purple-400 scale-50 shrink-0'/> Questions are categorized by difficulty: Easy, Medium, Hard, and Advanced</p>
                        <p className='flex items-center gap-2 text-xs sm:text-sm'><FaCircle className='text-xs text-purple-400 scale-50 shrink-0'/> Take your time - quality answers lead to better preparedness assessment</p> 
                        <p className='flex items-center gap-2 text-xs sm:text-sm'><FaCircle className='text-xs text-purple-400 scale-50 shrink-0'/> All fields must be completed before submitting</p>
                    </div>
                  </div>
      
                </div>
              </div>
            </div>
{/* -------------- */}
<div className='mt-4 flex flex-col gap-3'>{questions.map((question, index)=> (
  <QuestionBox difficulty={question.difficulty} question={question.question} index={index + 1} handleSubmit={handleSubmit}/>
))}</div>
           
       
       <div className='mt-4 lg:sticky lg:bottom-5 z-10 mb-32'>
<SubmitCard handleSubmit={handleSubmit} totalQuestions={totalQuestions} attemptedQuestions={attemptedQuestions} />
       </div>
       
     
    </div>
    </div>
  )
}
