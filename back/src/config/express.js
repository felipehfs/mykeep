const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => console.log(`Running on http://localhost:${port}`))

module.exports = app