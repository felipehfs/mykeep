require('dotenv').config()
const app = require('./src/config/express')
require('./src/config/mongoose')
require('./src/config/routes')(app)