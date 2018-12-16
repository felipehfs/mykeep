const Post = require('../models/post')

exports.create = async function(req, res) {
    try {
        const post = new Post(req.body)
        const saved = await post.save()
        res.status(201).json(saved)
    }catch(err) {
        res.status(500).json({ errors: [err]})
    }
}

exports.read = async function(req, res) {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.status(500).json({ errors: [err]})
    }
}

exports.findById = async function(req, res) {
    try {
        const search = await Post.findById(req.params.id)
        res.json(search)
    }catch(err) {
        res.status(500).json({ errors: [err] })
    }
}