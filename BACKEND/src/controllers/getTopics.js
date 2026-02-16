const fs = require('fs/promises');
const FS = require("fs")
const path = require('path');
const JSON5 = require('json5')

require("dotenv")

const OPENROUTER_API_KEY = "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"


 function parseAIJSON(aiText) {
  if (!aiText || typeof aiText !== "string") {
    throw new Error("AI response is empty or not a string");
  }

  // 1. Remove markdown code fences if present
  let cleaned = aiText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2. Try direct JSON parsing first
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // 3. Fallback: extract first JSON object found
    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No valid JSON object found in AI response");
    }

    try {
      return JSON.parse(match[0]);
    } catch (err2) {
      throw new Error("Failed to parse extracted JSON");
    }
  }
}

const cleanFileNames  = (files) => {

 return files.map((file) => path.parse(file).name)

}

const getTopics = (req, res) => {
    const {subject, exam} = req.params;

    const syllabus = JSON.parse(fs.readFileSync(path.join(__dirname, `../data/syllabus/${exam}/${subject}.json`), 'utf-8')); 

    const topics = syllabus.sections.map((section) =>  (
        {
            title: section.title,
            description: section.description,
            topics: section.topics.map(topic => topic.title)
        }
    )
    )

    return res.status(200).json({
        data: topics
    })


//A FUNCTION TO GET ALL TOPICS FOR EACH SUBJECT SELECTED

}
   

const getQuestionsForATopic = async (req, res) => {
     const {topic, subject, exam} = req.params

     console.log(topic, subject, exam)
    const syllabus =  JSON.parse(FS.readFileSync(path.join(__dirname, `../data/syllabus/${exam}/${subject}.json`), 'utf-8')); 
    const questions =  JSON.parse(FS.readFileSync(path.join(__dirname, `../data/questions/${exam}/${subject}.json`), 'utf-8')); 

   const prompt = `You are an experienced ${exam} examiner and curriculum expert.

SUBJECT: ${subject}
TOPIC: ${topic}

OFFICIAL SYLLABUS COVERAGE:
${syllabus}

REFERENCE PAST QUESTIONS (STYLE GUIDE ONLY – DO NOT REPEAT):
${questions}

INSTRUCTIONS:
- Generate EXACTLY 10 NEW theory questions
- Do NOT repeat or rephrase reference questions
- Questions must be strictly within the syllabus coverage
- Use clear, exam-appropriate language
- Match official ${exam} standards

DIFFICULTY DISTRIBUTION:
- Easy: 3 questions (definitions, identification, simple explanation)
- Medium: 3 questions (explanation, comparison, description)
- Hard: 3 questions (application, reasoning, relationships)
- Advanced: 1 question (critical thinking, scenario-based)

OUTPUT FORMAT (STRICT JSON):
{
  "questions": [
    {
      "difficulty": "easy | medium | hard | advanced",
      "question": "string",
      "model_answer": "string"
    }
  ]
}
`

 // First API call with reasoning
let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "arcee-ai/trinity-large-preview:free",
    "messages": [
      {
        "role": "user",
        "content": `${prompt}`
      }
    ],
    "reasoning": {"enabled": true}
  })
});

console.log("api key", OPENROUTER_API_KEY)
// Extract the assistant message with reasoning_details and save it to the response variable
const result = await response.json();
console.log("RESULT>>>>>", result)
// console.log("line 55", result)
response = result.choices[0].message.content;

console.log("RESPONSE>>>>>", response)
// const parsedResponse = JSON.parse(result.choices[0].message)

// Preserve the assistant message with reasoning_details
// const messages = [
//   {
//     role: 'user',
//     content: "How many r's are in the word 'strawberry'?",
//   },
//   {
//     role: 'assistant',
//     content: response.content,
//     reasoning_details: response.reasoning_details, // Pass back unmodified
//   },
//   {
//     role: 'user',
//     content: "Are you sure? Think carefully.",
//   },
// ];

// // Second API call - model continues reasoning from where it left off 
// const response2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     "model": "arcee-ai/trinity-large-preview:free",
//     "messages": messages  // Includes preserved reasoning_details
//   })
// });

// const result2 = await response2.json()
return res.status(200).json({
    data: JSON5.parse(response.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim())
})
    
}

// const getSubjectsAvailable = async (req, res) => {

//   try {
   

//   const directoryPathJamb = path.join(__dirname, `../data/syllabus/jamb`)
//   const directoryPathWaec = path.join(__dirname, `../data/syllabus/waec`)
//  const filesJamb = await fs.readdir(directoryPathJamb)
//  const filesWaec = await fs.readdir(directoryPathWaec)

// //  const cleanedFiles = cleanFileNames(filesJamb)


//    const syllabusWaecSubject = async (subject) =>  JSON.parse(fs.readFile(path.join(__dirname, `../data/syllabus/waec/${subject}.json`), 'utf-8')); 

    
//    const syllabusJambSubject = async (subject) => JSON.parse(fs.readFile(path.join(__dirname, `../data/syllabus/jamb/${subject}.json`), 'utf-8'));   


  

//     // const topics = syllabus.sections.map((section) =>  (
//     //     {
//     //         title: section.title,
//     //         description: section.description,
//     //         topics: section.topics.map(topic => topic.title)
//     //     }
//     // ))


//  res.status(200).json({
//   examTypes: {
//      jamb: cleanFileNames(filesJamb).map((subject) => (
//       {
//         subject: subject,
//         topics: syllabusJambSubject(subject).sections.map((section) => (
//           {
//             title: section.title,
//             description: section.description,
//             subtopics: section.topics.map(topic => topic.title)
//           }
//         ))
//       }

//      )),
//     waec: cleanFileNames(filesWaec).map((subject) => (
//       {
//         subject: subject,
//         topics: syllabusWaecSubject(subject).sections.map((section) => (
//           {
//             title: section.title,
//             description: section.description,
//             subtopics: section.topics.map(topic => topic.title)
//           }
//         ))
//       }

//      )),
  
   
//   }
//  })
    
//   } catch (error) {
//     res.status(500).json({
//       error: error.message
//     })
    
//   }
 
 

// }

const getSubjectsAvailable = async (req, res) => {
  try {
    const jambDir = path.join(__dirname, "../data/syllabus/jamb");
    const waecDir = path.join(__dirname, "../data/syllabus/waec");

    const [filesJamb, filesWaec] = await Promise.all([
      fs.readdir(jambDir),
      fs.readdir(waecDir)
    ]);

    const readSubject = async (basePath, subject) => {
      const filePath = path.join(basePath, `${subject}.json`);
      const content = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content);
    };

    const buildSubjects = async (files, basePath) =>
      Promise.all(
        cleanFileNames(files).map(async (subject) => {
          const syllabus = await readSubject(basePath, subject);

          return {
            subject,
            topics: syllabus.sections.map(section => ({
              title: section.title,
              description: section.description,
              subtopics: section.topics.map(topic => topic.title)
            }))
          };
        })
      );

    const [jambSubjects, waecSubjects] = await Promise.all([
      buildSubjects(filesJamb, jambDir),
      buildSubjects(filesWaec, waecDir)
    ]);

    res.status(200).json({
      examTypes: {
        jamb: jambSubjects,
        waec: waecSubjects
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getResultsForATopic = async (req, res) => {
  try {
    const {topic, subject, exam} = req.params
    const {submissions} = req.body

    console.log("SUBMISSION", submissions)
    console.log(topic, subject, exam)

    // Validate inputs
    if (!submissions || !Array.isArray(submissions) || submissions.length === 0) {
      return res.status(400).json({ error: "Invalid submissions data" });
    }

    // Read files with error handling
    let syllabus, questions;
    try {
      syllabus = JSON.parse(FS.readFileSync(path.join(__dirname, `../data/syllabus/${exam}/${subject}.json`), 'utf-8'));
      questions = JSON.parse(FS.readFileSync(path.join(__dirname, `../data/questions/${exam}/${subject}.json`), 'utf-8'));
    } catch (fileError) {
      console.error("File reading error:", fileError);
      return res.status(500).json({ error: "Failed to read data files", details: fileError.message });
    }

    const gradingPrompt = `
You are a friendly grading assistant. Do NOT hallucinate. Your tone is supportive, encouraging, and first-person (use "You" instead of "the student"). Evaluate understanding, not exact words.

You will be given an array of questions. Each question object has:
- "question": the question text
- "model_answer": the correct answer
- "user_answer": the answer the user typed
- "syllabus": the relevant syllabus coverage for the question

Questions Array:
${JSON.stringify(submissions, null, 2)}


Instructions:
1. Identify the key points in the model answer.
2. Check how many of those key points are present in the user's answer.
3. Score the answer out of 10 based on correctness, completeness, and clarity.
4. Provide a brief explanation in 1–2 sentences, speaking directly to the user ("You ...").
5. Give a comprehensive learning recommendation, written in friendly first-person language. Include:
   - The key points you missed
   - How to revise or practice them
   - Tips to remember them
   - Suggested ways to improve for next time
   - References to relevant topics in the syllabus if helpful
   - You can add any new facts. But makes sure it is within the provided syllabus and topic: ${topic}.


⚠️ RETURN ONLY VALID JSON, NO EXTRA TEXT. The JSON must be an array of objects, in the exact format:

[
  {
    "question": "string",
    "model_answer": "string",
    "user_answer": "string",
    "difficulty": "string" 
    "score": number,
    "explanation": "text",
    "recommendation": "text"
  }
]
`

    console.log("API key present:", !!OPENROUTER_API_KEY)
    
    // API call with error handling
    let response;
    try {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: 'stepfun/step-3.5-flash:free',
          "messages": [
            {
              "role": "user",
              "content": `${gradingPrompt}`
            }
          ],
          "reasoning": {"enabled": true}
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (!result.choices || !result.choices.length) {
        console.error("AI ERROR:", result);
        return res.status(500).json({ error: "AI failed to generate response", details: result });
      }

      const aiResponse = result.choices[0].message.content;

      // Parse the AI response
      const parsedData = JSON5.parse(aiResponse.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim());
console.log("SUCCESS", parsedData)
      return res.status(200).json({
        data: parsedData
      })

    } catch (apiError) {
      console.error("API Error:", apiError);
      return res.status(500).json({ 
        error: "Failed to grade answers", 
        details: apiError.message 
      });
    }

  } catch (error) {
    console.error("Unexpected error in getResultsForATopic:", error);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
};




module.exports = {getTopics, getQuestionsForATopic, getSubjectsAvailable, getResultsForATopic}