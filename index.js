const express = require("express")
require("./connection")
require("dotenv").config()
const taskRouter = require("./routes/taskRouters")
const notFound = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorhandlerMiddleware")

const app =  express()

app.use(express.json())

app.use("/api/v1", taskRouter)
app.use(notFound)

app.use(errorHandlerMiddleware)

app.listen(8000, ()=>console.log("running on port 8000"))