const taskService = require('../api/controller/taskService')
const postService = require('../api/controller/postService')
const userService = require("../api/controller/userService")


const express = require('express')

module.exports = function(server) {
    const router = express.Router()
    
    router.all("*", userService.loginRequired)
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

    server.post("/register", userService.register)
    server.post("/login", userService.login)
    
    server.use("/api", router)
}