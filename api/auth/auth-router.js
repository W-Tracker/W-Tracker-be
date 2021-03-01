const router = require('express').Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../../config/secrets")
const AuthModel = require("./auth-model")
const {isValid} = require("./auth-middleware")
const restricted = require('../middleware/restricted-middleware')

router.post('/register', isValid, async (req, res) => {
    const credentails = req.body
    const rounds = Number(process.env.BCRYPT_ROUNDS || 5)
    const hash = bcryptjs.hashSync(credentails.password, rounds)
    credentails.password = hash
    const user = {username: credentails.username, password: credentails.password, role: credentails.role, firstName: credentails.firstName, lastName: credentails.lastName, email: credentails.email}

    try {
      const newUser = await AuthModel.add(user)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json(err.message)
    }
})

router.post("/login", (req, res) => {
    const { username, password} = req.body
    AuthModel.findBy({ username: username})
        .then(([user]) => {
          if ( user && bcryptjs.compareSync(password, user.password)){
            console.log(user)
            const token = makeToken(user)
            jwt.verify(token, jwtSecret, (err, decoded) => {
              if(err){
                res.status(401).json("token invalid")
              } else {
                req.decodedToken = decoded
              }
            })
            res.status(200).json({
              message: `welcome, ${user.username}`,
              token: token,
              userId: req.decodedToken.subject
            })
          } else {
            res.status(401).json("invalid credentials")
          }
        }) .catch (err => {
          res.status(401).json({ERROR: err.message})
        })
})

function makeToken(user){
    const payload = {
      subject: user.id,
      username: user.username,
    }
    const options = {
      expiresIn: 86400000
    }
    return jwt.sign(payload, jwtSecret, options)
}

router.get("/usersplz", restricted, async (req, res) => {
    const data = await AuthModel.getAll()
    res.status(200).json({data: data, decoded: req.decodedToken})
})

module.exports = router