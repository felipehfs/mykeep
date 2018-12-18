const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next){
    if (req.headers && req.headers.authorization 
        && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, function (err, decode){
                if (err) {
                    console.log(err.message)
                    req.user = undefined
                    res.status(400).json({ message: err})
                    return
                }
                if (new Date(decode.exp * 1000) > new Date()) {
                    req.user = decode
                    next()
                } else {
                    res.status(401).json({ message: "Session expired"})
                }
            })
        } else {
            req.user = undefined
            next()
        }
})

app.listen(port, () => console.log(`Running on http://localhost:${port}`))

module.exports = app