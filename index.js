require("dotenv").config()
const server = require("./api/server")
const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`\n*** Server doing its thang on port ${PORT} ***\n`)
})