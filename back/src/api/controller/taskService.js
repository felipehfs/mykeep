const Task = require('../models/task')

exports.create = async function(req, res) {
    try{
        const task = new Task(req.body)
        const saved = await task.save()
        res.json(saved)
    } catch(err) {
        res.status(500).json({ errors: [err]})
    }
}

exports.read = async function(req, res) {
    try{
        const tasks = await Task.find()
        res.json(tasks)
    } catch(err) {
        res.status(500).json({ errors: [err] })
    }
}

exports.remove = async function(req, res) {
    try {
        const removedTask = await Task.findByIdAndRemove(req.params.id)
        res.json(removedTask)
    } catch(err) {
        res.status(500).json({ errors: [err]})
    }
}

exports.update = async function(req, res) {
    try {
        const updatedTask = await Task.findOneAndUpdate({_id: req.params.id}, req.body)
        res.json(updatedTask)
    }catch(err) {
        res.status(500).json({ errors: [err]})
    }
}