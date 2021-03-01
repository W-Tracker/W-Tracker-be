require("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const authRouter = require("./auth/auth-router")



const server = express()


server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api/auth", authRouter)


server.get("/", (_, res) => {
    res.status(200).json({message: "🏃 Server is up an running 🏃"})
})

module.exports = server