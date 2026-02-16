import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './pages/Home'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { ExamTypeDetails } from './pages/ExamTypeDetails'
import { SubjectPageDetails } from './pages/SubjectPageDetails'
import { TopicQuestions } from './pages/TopicQuestions'
import { createContext } from 'react'
import { ExamProvider } from './context/ExamContext'
import { Results } from './pages/Results'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ExamProvider>
    <Router>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/exam/:examType' element={<ExamTypeDetails/>}/>
         <Route  path='/exam/:examType/:subject' element={<SubjectPageDetails/>}/>
           <Route  path='/exam/:examType/:subject/:topic' element={<TopicQuestions/>}/>
            <Route  path='/exam/:examType/:subject/:topic/results' element={<Results/>}/>

      </Routes>
    
    </Router>
    </ExamProvider>
      
       
    </>
  )
}

export default App
