import React from 'react'


export const fetchExams = async () => {
  
  const res = await fetch("http://localhost:3000/subjects/allSubjects");

  if (!res.ok) {
    throw new Error("Failed to fetch exams");
  }

  return res.json();
};

export const fetchExamTopics = async(examType, subject ) => {
    const res = await fetch(`http:localhost:3000/allTopics/${examType}/${subject}`)

    if(!res.ok) {
        throw new Error("Failed to fetch exams")
    }

    return res.json()
}

export const fetchExamTopicQuestions = async(examType, subject, topic) => {
    try {
       const res = await fetch(`http://localhost:3000/topics/test/${examType}/${subject}/${topic}`) 

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
    const res = await fetch(
      `http://localhost:3000/topics/result/${examType}/${subject}/${topic}`,
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
