const express = require("express")
const { getTopics, getQuestionsForATopic, getSubjectsAvailable } = require("../controllers/getTopics")

const Router = express.Router()

Router.get("/allSubjects", getSubjectsAvailable)  


module.exports = Router