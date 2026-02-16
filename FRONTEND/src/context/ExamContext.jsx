import React, { useContext, useState } from 'react'
import { createContext } from 'react'


const ExamContext = createContext()
export const ExamProvider = ({children}) => {

   const apiUrl = import.meta.env.VITE_API_URL_BACKEND || 'http://localhost:3000'

    const [answers , setAnswers] = useState({})


    //Array after user finsh answering in te topicQuestion component
    const [submitting, setSubmitting] = useState(null)
    const [result , setResult] = useState({})


    


  return (
    <ExamContext.Provider value={{answers, setAnswers, submitting, setSubmitting, result, setResult, apiUrl}}>{children}

    </ExamContext.Provider>
  )
}

export const useExam = () => useContext(ExamContext)