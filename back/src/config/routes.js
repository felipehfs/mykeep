const taskService = require('../api/controller/taskService')
const postService = require('../api/controller/postService')

const express = require('express')

module.exports = function(server) {
    const router = express.Router()
    
    router.route("/tasks")
        .get(taskService.read)
        .post(taskService.create)
    
    router.route("/tasks/:id")
        .put(taskService.update)
        .delete(taskService.remove)

    router.route("/posts")
        .get(postService.read)
        .post(postService.create)

    router.route("/posts/:id")
        .get(postService.findById)
    
    server.use("/api", router)
}