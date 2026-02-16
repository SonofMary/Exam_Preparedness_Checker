import React from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { BackTo } from "../components/BackTo";
import { LuLightbulb } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { TopicsDetailsCard } from "../components/TopicsDetailsCard";
import { fetchExams } from "../api/fetchExamSubject";

export const SubjectPageDetails = () => {
  const { subject, examType } = useParams();

   const {data, isLoading, error} = useQuery({
        queryKey: ["exam"],
        queryFn: fetchExams,
        // initialData: catchedData

    })







   if (isLoading)  return  <div className='flex items-center justify-center min-h-screen'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
   if (error) return <p className='text-center text-red-500'>{error.message}</p>

    const subjectData = data?.examTypes?.[examType].find((subjectData) => subjectData.subject == subject )

    const topics = subjectData.topics

  return (
    <div className="mx-auto w-full sm:w-5/6 px-4 sm:px-0">
      <BackTo onClick={() => window.history.back()} />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-0">{capitalize(subject)}</h1>
      <p className="text-sm sm:text-base md:text-lg mt-2">Select a topic to begin your preparedness test</p>

      <div className="mt-4 sm:mt-6">
        <div className="card w-full bg-base-100 card-lg shadow-sm border border-indigo-400">
          <div className="card-body flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-6">
            
            {/* Icon */}
            <LuLightbulb className="text-purple-600 text-xl sm:text-2xl mt-1 shrink-0" />

            {/* Text */}
            <div>
              <h2 className="font-semibold mb-1 text-base sm:text-lg">What to Expect</h2>
              <p className="text-xs sm:text-sm md:text-base">
                You'll answer 10 theory questions: 3 easy, 3 medium, 3 hard, and 1
                advanced. Your answers will be evaluated to determine your
                preparedness level for this topic.
              </p>
            </div>

          </div>
        </div>
      </div>
        <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">    
         {topics.map((topic) => <TopicsDetailsCard  title={topic.title} subtopics={topic.subtopics} exam={examType} subject={subject}/>)}
        </div>
     
    </div>
  );
};
