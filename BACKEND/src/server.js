const express = require('express');
require("dotenv").config()
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const topicRoute = require("./routes/routes.topics")
const subjectRoute = require("./routes/routes.subjects")


app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

app.use("/topics", topicRoute)
app.use("/subjects", subjectRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

