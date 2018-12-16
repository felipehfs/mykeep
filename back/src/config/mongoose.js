const mongoose = require('mongoose')

module.exports = mongoose.connect("mongodb://localhost/mykeep", { useNewUrlParser: true })