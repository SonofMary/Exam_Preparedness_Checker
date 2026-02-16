import React from 'react'
import { useExam } from '../context/ExamContext'
import {getResults} from '../api/fetchExamSubject'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { ResultProgressBar } from '../components/ResultProgressBar'
import { IoBulbOutline } from "react-icons/io5";
import { GiBullseye } from "react-icons/gi";



export const Results = () => {

        const navigate = useNavigate()
        const {examType, subject, topic} = useParams()

    const {result, setResult, submitting, setSubmitting } = useExam()

    
    
const [openIndex, setOpenIndex] = useState(null);
const [localResult, setLocalResult] = useState(null);

    useEffect(()=>{
        if (!submitting) return; // Only fetch when submitting has data

        const fetchResult = async () => {
            const res = await getResults(examType, subject, topic, submitting)

//             const dummyResult =  [
//   {
//     question: "Define the term 'ecosystem' and list its two main components.",        
//     model_answer: 'An ecosystem is a community of living organisms interacting with each other and their physical environment. The two main components are biotic (living) and abiotic (non-living) factors.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "easy",
//     explanation: 'You did not provide an answer, so I cannot assess your understanding of ecosystem definitions and components.',
//     recommendation: "I recommend you review the basic definition of an ecosystem and memorize the two main components: biotic (living organisms) and abiotic (non-living factors). Practice by writing this definition from memory and listing examples for each component, such as plants for biotic and sunlight for abiotic. Refer to the 'Ecosystem Structure' topic in your ecology syllabus. To improve, always attempt to answer questions, even with bullet points, and compare your response to the model answer to identify gaps."
//   },
//   {
//     question: 'State the difference between a food chain and a food web.',
//     model_answer: 'A food chain is a linear sequence of organisms through which nutrients and energy pass, while a food web is a complex network of interconnected food chains showing multiple feeding relationships.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "easy",
//     explanation: 'You left this question unanswered, so I cannot evaluate your knowledge on the distinction between food chains and food webs.',
//     recommendation: "Focus on the key difference: food chains are simple and linear, showing one path of energy flow, while food webs are complex and interconnected, showing multiple feeding relationships. Practice by drawing a simple food chain (e.g., grass → rabbit → fox) and then expanding it into a food web with additional organisms. This helps visualize the complexity. Review the 'Trophic Levels and Energy Flow' section in your ecology syllabus. Tip: Remember that food webs are more realistic as most organisms have multiple food sources."
//   },
//   {
//     question: 'Name three abiotic factors that affect the distribution of organisms in an ecosystem.',
//     model_answer: 'Temperature, water availability, and light intensity are three abiotic factors that affect organism distribution.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "easy",
//     explanation: 'You did not answer this question, so I cannot check if you know common abiotic factors influencing organism distribution.',
//     recommendation: "You need to recall at least three abiotic factors, such as temperature, water, light, soil pH, or salinity. Practice by listing abiotic factors for different ecosystems (e.g., desert vs. forest) and explaining how each affects organisms. For example, in deserts, high temperature and low water availability limit species. Refer to the 'Abiotic and Biotic Factors' topic in your ecology syllabus. Use flashcards to memorize key terms and their impacts."
//   },
//   {
//     question: 'Explain the concept of ecological succession and give one example of primary succession.',
//     model_answer: 'Ecological succession is the gradual and predictable change in species composition of a community over time. An example of primary succession is the colonization of bare rock by lichens, followed by mosses, grasses, shrubs, and eventually trees.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "medium",
//     explanation: 'Without your response, I cannot determine if you understand ecological succession and can provide an example of primary succession.',
//     recommendation: "Study the definition of ecological succession as a gradual, predictable change in species over time, and distinguish between primary (starting on bare substrate) and secondary (after disturbance) succession. For primary succession, memorize the classic example: lichens colonizing bare rock, leading to soil formation and eventual forest. Practice by outlining the stages of succession for a volcanic island or retreating glacier. Review the 'Ecological Succession' section in your ecology syllabus. Tip: Use the mnemonic 'L-M-G-S-T' for lichens, mosses, grasses, shrubs, trees in primary succession."
//   },
//   {
//     question: 'Describe the role of decomposers in nutrient cycling within an ecosystem.',
//     model_answer: 'Decomposers break down dead organic matter, releasing nutrients back into the soil or water. This process makes nutrients available for uptake by plants, thus maintaining the nutrient cycle and supporting ecosystem productivity.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "medium",
//     explanation: 'You did not respond, so I cannot assess your understanding of decomposers and their function in nutrient cycles.',
//     recommendation: "Focus on how decomposers (e.g., bacteria, fungi) break down dead material, recycle nutrients like carbon and nitrogen, and support plant growth. Practice by explaining the process step-by-step: decomposition → nutrient release → plant uptake → continued cycle. Refer to the 'Nutrient Cycling' topic in your ecology syllabus. To remember, think of decomposers as nature's recyclers; without them, ecosystems would run out of nutrients. Draw a simple diagram of the nutrient cycle to visualize."  
//   },
//   {
//     question: 'Compare and contrast the pyramid of numbers and the pyramid of biomass in an ecosystem.',
//     model_answer: 'The pyramid of numbers shows the number of organisms at each trophic level, while the pyramid of biomass represents the total mass of organisms at each level. The pyramid of numbers can be inverted in some ecosystems, but the pyramid of biomass is typically upright, reflecting the decrease in biomass from producers to top consumers.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "medium",
//     explanation: 'Since you provided no answer, I cannot evaluate your knowledge on pyramids of numbers versus biomass.',
//     recommendation: "Understand that pyramid of numbers counts individuals per trophic level, while pyramid of biomass measures total mass (e.g., grams per square meter). Key contrast: numbers pyramid can be inverted (e.g., many insects on one tree), but biomass pyramid is usually upright due to energy loss. Practice by sketching both pyramids for a grassland ecosystem and explaining why they differ. Review the 'Energy Flow and Ecological Pyramids' section in your ecology syllabus. Tip: Remember that biomass often correlates with energy content, so it's more stable than numbers."
//   },
//   {
//     question: 'Explain how human activities can lead to the disruption of biogeochemical cycles, using the carbon cycle as an example.',
//     model_answer: 'Human activities like burning fossil fuels and deforestation increase atmospheric CO2 levels, disrupting the carbon cycle. This leads to enhanced greenhouse effect, climate change, and ocean acidification, affecting global ecosystems and biodiversity.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "hard",
//     explanation: 'You did not answer, so I cannot assess if you can link human activities to carbon cycle disruption and its consequences.',
//     recommendation: "Review how human actions—primarily fossil fuel combustion and deforestation—add excess CO2 to the atmosphere, altering the carbon cycle. Focus on consequences: greenhouse effect, global warming, ocean acidification. Practice by outlining the natural carbon cycle and then showing where humans interfere. Refer to the 'Biogeochemical Cycles' and 'Human Impacts' topics in your ecology syllabus. To remember, associate 'CO2 increase' with 'climate change' and 'ocean harm'. Use current events, like news on emissions, to reinforce."
//   },
//   {
//     question: 'Discuss the concept of carrying capacity and how it relates to population dynamics in an ecosystem.',
//     model_answer: 'Carrying capacity is the maximum population size an environment can sustain indefinitely. It relates to population dynamics through factors like resource availability, competition, and environmental resistance. When populations exceed carrying capacity, they may experience dieback or stabilize at a new equilibrium.',       
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "hard",
//     explanation: 'Without your response, I cannot determine if you understand carrying capacity and its role in population changes.',
//     recommendation: "Memorize carrying capacity as the max sustainable population size based on resources. Relate it to population dynamics: growth slows as resources limit, competition increases, and environmental resistance (e.g., predation, disease) acts. Practice by graphing logistic growth showing carrying capacity as a plateau. Review the 'Population Ecology' section in your ecology syllabus. Tip: Think of carrying capacity as an 'environmental ceiling'; exceeding it causes crashes or adjustments. Use examples like deer populations in a forest."
//   },
//   {
//     question: 'Analyze the impact of invasive species on native ecosystems, providing one example of such an impact.',
//     model_answer: 'Invasive species can outcompete native species for resources, alter habitats, and disrupt ecological relationships. For example, the introduction of cane toads in Australia has led to declines in native predator populations due to their toxic skin secretions.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "hard",
//     explanation: 'You did not provide an answer, so I cannot evaluate your analysis of invasive species impacts and examples.',
//     recommendation: "Study how invasive species (non-native, spreading aggressively) harm ecosystems by competing with natives, changing habitats, or introducing diseases. Memorize a specific example: cane toads in Australia poison native predators like quolls or snakes. Practice by listing other examples (e.g., zebra mussels in lakes) and explaining mechanisms. Refer to the 'Species Interactions' and 'Human Impacts' topics in your ecology syllabus. To remember, associate 'invasive' with 'invasion' and negative outcomes; use case studies to solidify."
//   },
//   {
//     question: "A forest ecosystem experiences a severe drought followed by heavy rainfall. Predict and explain the short-term and long-term ecological consequences of this scenario on the ecosystem's structure and function.",
//     model_answer: 'Short-term consequences may include plant die-off, reduced primary productivity, and animal migration or mortality. Long-term effects could involve shifts in species composition, altered nutrient cycling, changes in soil structure, and potential establishment of drought-resistant species. The ecosystem may eventually reach a new equilibrium with different community structure and function.',
//     user_answer: 'no answer',
//     score: 0,
//     difficulty: "advanced",
//     explanation: 'You left this question unanswered, so I cannot assess your ability to predict and explain ecological consequences of extreme weather events.',
//     recommendation: "For such scenario-based questions, break it into short-term (immediate effects) and long-term (lasting changes). Short-term: drought causes water stress, plant death, animal displacement; heavy rain may cause erosion or flooding. Long-term: species shift to drought-tolerant types, nutrient cycles alter (e.g., runoff), soil changes, new equilibrium. Practice by applying this framework to other disturbances like fires or floods. Review the 'Ecosystem Dynamics' and 'Disturbances' topics in your ecology syllabus. Tip: Always consider both biotic (species) and abiotic (soil, water) factors in your predictions."
//   }
// ]
            setLocalResult(res.data)
        }
        fetchResult()   
    }, [])
    console.log(localResult)

    console.log(submitting, "submitted data in result page")
  if (!localResult || !Array.isArray(localResult) || localResult.length === 0) {
    return  <div className='flex flex-col items-center justify-center min-h-screen'>
            <span className="loading loading-infinity loading-xl"></span>
            <span>Loading Results...</span>
        </div>
  }

  const quotes = [
    
    {
      "quote": "There are no shortcuts to any place worth going.",
      "author": "Beverly Sills"
    },
    {
      "quote": "Success is the sum of small efforts, repeated day in and day out.",
      "author": "Robert Collier"
    },
    {
      "quote": "The expert in anything was once a beginner.",
      "author": "Helen Hayes"
    }
  ,
    {
      "quote": "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      "author": "Mahatma Gandhi"
    },
    {
      "quote": "Education is the most powerful weapon which you can use to change the world.",
      "author": "Nelson Mandela"
    },
    {
      "quote": "An investment in knowledge pays the best interest.",
      "author": "Benjamin Franklin"
    }
  ,
    {
      "quote": "It always seems impossible until it’s done.",
      "author": "Nelson Mandela"
    },
    {
      "quote": "Don’t watch the clock; do what it does. Keep going.",
      "author": "Sam Levenson"
    },
    {
      "quote": "Push yourself, because no one else is going to do it for you.",
      "author": "Unknown"
    }
  ,
    {
      "quote": "By failing to prepare, you are preparing to fail.",
      "author": "Benjamin Franklin"
    },
    {
      "quote": "The beautiful thing about learning is that no one can take it away from you.",
      "author": "B. B. King"
    }
  ]


  const quoteOfTheDay = quotes[Math.floor(Math.random() * quotes.length)]



  const totalScore = localResult.reduce((acc, currentQuestion) => acc + currentQuestion.score, 0)
  const percentageScore = (totalScore / (localResult.length * 10)) * 100

  const easyQuestions = localResult.filter(q => q.difficulty === "easy")
  const mediumQuestions = localResult.filter(q => q.difficulty === "medium")
  const hardQuestions = localResult.filter(q => q.difficulty === "hard")
  const advancedQuestions = localResult.filter(q => q.difficulty === "advanced")

  const averageEasyScore = easyQuestions.length > 0 ? (Math.round((easyQuestions.reduce((acc, question)=> acc + question.score, 0) / (easyQuestions.length * 10)) * 100)) : 0
    const averageMediumScore = mediumQuestions.length > 0 ? (Math.round((mediumQuestions.reduce((acc, question)=> acc + question.score, 0) / (mediumQuestions.length * 10)) * 100)) : 0
    const averageHardScore = hardQuestions.length > 0 ? (Math.round((hardQuestions.reduce((acc, question)=> acc + question.score, 0) / (hardQuestions.length * 10)) * 100)) : 0
    const averageAdvancedScore = advancedQuestions.length > 0 ? (Math.round((advancedQuestions.reduce((acc, question)=> acc + question.score, 0) / (advancedQuestions.length * 10)) * 100))  : 0  
  return (  
    <div className='mx-auto px-4 sm:px-8 py-6 sm:py-10 w-full'>
        
        <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold'>Your Results</h1>
            <p className='text-xs sm:text-sm md:text-base'>Here is your preparedness assessment score:</p>
             <p className='bg-blue-900 text-amber-100 rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl w-24 sm:w-32 h-24 sm:h-32 border-2 border-amber-300 font-mono hover:bg-purple-600'> {Math.round(percentageScore)}%</p>  
             <p></p>
        
        </div>

        <div className=' flex flex-col items-center justify-center'>
            <p className='text-sm sm:text-base md:text-lg font-semibold'>Performance Breakdown</p>
            <div className='flex flex-col items-start justify-center gap-3 sm:gap-4 mt-4 w-full max-w-2xl px-4 sm:px-0'>
                <p className="mb-2 flex flex-wrap sm:flex-nowrap gap-2 items-center text-xs sm:text-sm"><span className='w-16 sm:w-28'>Easy:</span> <div className='grow'><ResultProgressBar percentage={averageEasyScore} difficulty="easy"/></div> <span className='ml-2'>{averageEasyScore}%</span></p>
                <p className="mb-2 flex flex-wrap sm:flex-nowrap gap-2 items-center text-xs sm:text-sm"><span className='w-16 sm:w-28'>Medium:</span> <div className='grow'><ResultProgressBar percentage={averageMediumScore} difficulty="medium"/></div> <span className='ml-2'>{averageMediumScore}%</span></p>
                <p className="mb-2 flex flex-wrap sm:flex-nowrap gap-2 items-center text-xs sm:text-sm"><span className='w-16 sm:w-28'>Hard:</span> <div className='grow'><ResultProgressBar percentage={averageHardScore} difficulty="hard"/></div> <span className='ml-2'>{averageHardScore}%</span></p>
                <p className="mb-2 flex flex-wrap sm:flex-nowrap gap-2 items-center text-xs sm:text-sm"><span className='w-16 sm:w-28'>Advanced:</span> <div className='grow'><ResultProgressBar percentage={averageAdvancedScore} difficulty="advanced"/></div> <span className='ml-2'>{averageAdvancedScore}%</span></p>
            </div>


            
        </div>

        <div className="divider divider-primary mt-6 mb-5 text-xs sm:text-base">Tips for Improvement</div>

        <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0">
  <div className="card bg-base-300 rounded-box flex h-auto sm:h-30 p-3 sm:p-2 w-full sm:w-1/2 border border-gray-300 items-center justify-center">
    <section className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center pt-2'>
     <p><IoBulbOutline className="text-amber-500 text-3xl sm:text-4xl h-full shrink-0"/></p>
    <div className='flex flex-col justify-center gap-2 text-center sm:text-left'>
      <p className='text-xs sm:text-sm'>{percentageScore > 80 ? "Excellent!, Don't stop learning!" : percentageScore > 60 ? "Good job!, keep improving!" : "Keep practicing!, You're on the right track!"}</p>
      <p className='text-xs sm:text-sm italic'>{quoteOfTheDay.quote} - {quoteOfTheDay.author}</p>
    </div>
    </section>
   
  </div>
  <div className="divider sm:divider-horizontal"></div>
  <div className="card bg-base-300 rounded-box flex h-auto sm:h-30 p-3 sm:p-2 w-full sm:w-1/2 border border-gray-300 items-center justify-center">
    <section className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center pt-2'>
     <p><GiBullseye className="text-red-500 text-3xl sm:text-4xl h-full shrink-0"/></p>
    <div className='flex flex-col justify-center gap-2 text-center sm:text-left'>
      <p className='text-xs sm:text-sm'>{percentageScore > 80 ? "Always aim higher than the last score!" : percentageScore > 60 ? "Shoot for the stars!" : "Never stop showing up"}</p>
      <p className='text-xs sm:text-sm'>{"Review your results and identify areas for improvement."}</p>
    </div>
    </section>
   
  </div>
</div>
        {openIndex && <h2 className='text-xl sm:text-2xl font-semibold mt-6 mb-6 text-center'><div className="divider divider-primary text-xs sm:text-base">Detailed Feedback</div></h2>}
        { openIndex ?  localResult.map((q, index) => (
  <div key={index} className="card mb-4 flex flex-col items-start gap-2 border border-gray-300 rounded-lg p-3 sm:p-4">

   <details className="collapse bg-base-100 border border-base-300 w-full" name="my-accordion-det-1" open>
  <summary className="collapse-title font-semibold text-sm sm:text-base">Question {index + 1}</summary>
  <div className="collapse-content text-xs sm:text-sm">{q.question}</div>
  <div className="collapse-content text-xs sm:text-sm"><span className="font-semibold">Difficulty:</span> {q.difficulty}</div>
  <div className="collapse-content text-xs sm:text-sm"><span className="font-semibold">Model Answer:</span> {q.model_answer}</div>
  <div className="collapse-content text-xs sm:text-sm"><span className="font-semibold">Your Answer:</span> {q.user_answer}</div>
  <div className="collapse-content text-xs sm:text-sm"><span className="font-semibold">Score:</span> {q.score} out of 10</div>
  <div className="collapse-content text-xs sm:text-sm"><span className="font-semibold">Explanation:</span> {q.explanation}</div>
  <div className="collapse-content text-xs sm:text-sm"><span className="font-semibold">Recommendation:</span> {q.recommendation}</div>
</details>
</div>
)) : <button className="btn btn-primary mx-auto flex btn-sm sm:btn-md text-xs sm:text-sm mt-4 justify-center" onClick={() => setOpenIndex(true)}>View Results</button>}

       


    </div>
  )
}
