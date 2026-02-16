import React from 'react'


export const fetchExams = async () => {
  
  const apiUrl = import.meta.env.VITE_API_URL_BACKEND || 'http://localhost:3000'
  console.log("Fetching from:", `${apiUrl}/subjects/allSubjects`)
  
  const res = await fetch(`${apiUrl}/subjects/allSubjects`);

  if (!res.ok) {
    console.error("Fetch error:", res.status, res.statusText)
    throw new Error(`Failed to fetch exams: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchExamTopics = async(examType, subject ) => {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND || 'http://localhost:3000'
    const res = await fetch(`${apiUrl}/allTopics/${examType}/${subject}`)

    if(!res.ok) {
        console.error("Fetch error:", res.status, res.statusText)
        throw new Error(`Failed to fetch topics: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export const fetchExamTopicQuestions = async(examType, subject, topic) => {
    try {
       const apiUrl = import.meta.env.VITE_API_URL_BACKEND || 'http://localhost:3000'
       const res = await fetch(`${apiUrl}/topics/test/${examType}/${subject}/${topic}`) 

       if(!res.ok) {
        throw new Error("failed to fetch exams")
       }
       const data = await res.json()

       console.log(data, "data received")
       return data
    } catch (error) {
        console.log(error.message)
        
    }
}

export const getResults = async (examType, subject, topic, submittedData) => {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND || 'http://localhost:3000'
    const res = await fetch(
      `${apiUrl}/topics/result/${examType}/${subject}/${topic}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ submissions: submittedData })
      }
    )

    return res.json()
  }
