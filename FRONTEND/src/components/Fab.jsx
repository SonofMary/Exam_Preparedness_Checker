import React from 'react'
import { FiDownload, FiSearch } from 'react-icons/fi'

export const Fab = () => {
  return (
    <div>
           <div className="fab">
  {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
  <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-success"><FiDownload className="text-lg sm:text-2xl" /></div>

  {/* buttons that show up when FAB is open */}
  <button className="btn btn-lg bg-[#029442] text-[white] text-xs sm:text-sm md:text-base" onClick={() => window.open("https://myschoolgist.com/ng/jamb-syllabus/", "_blank")}>JAMB Syllabus</button>
  <button className="btn btn-lg bg-[#060B55] text-[#FAD702] text-xs sm:text-sm md:text-base" onClick={() => window.open("https://myschoolgist.com/ng/waec-syllabus-by-subject-2013/", "_blank")}>WAEC Syllabus</button>
  
    <button className="btn btn-lg bg-[#029442] text-[white] text-xs sm:text-sm md:text-base" onClick={() => window.open("https://myschoolgist.com/ng/free-jamb-past-questions-available/", "_blank")}>JAMB Past Questions</button>
    <button className="btn btn-lg bg-[#060B55] text-[#FAD702] text-xs sm:text-sm md:text-base" onClick={() => window.open("https://myschoolgist.com/ng/free-waec-past-questions-and-answers/", "_blank")}>WAEC Past Questions</button>
 
</div>
    </div>
  )
}
