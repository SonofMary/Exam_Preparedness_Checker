const express = require("express")
const { getTopics, getQuestionsForATopic, getSubjectsAvailable, getResultsForATopic } = require("../controllers/getTopics")

const Router = express.Router()

Router.get("/allTopics/:exam/:subject", getTopics)
Router.get("/test/:exam/:subject/:topic", getQuestionsForATopic)  


Router.post("/result/:exam/:subject/:topic", getResultsForATopic)    

Router.get("/allSubjects", getSubjectsAvailable)  


module.exports = Router