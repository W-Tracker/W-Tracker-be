require("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const restricted = require("./middleware/restricted-middleware")
const authRouter = require("./auth/auth-router")
const strainsRouter = require("./strains/strains-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api/auth", authRouter)
server.use("/api/strains", restricted, strainsRouter)

server.get("/", (_, res) => {
    res.status(200).json({message: "🏃 Server is up an running 🏃"})
})

module.exports = server