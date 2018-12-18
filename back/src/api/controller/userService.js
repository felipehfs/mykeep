const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

exports.register = async function(req, res) {
    try{
        const user = new User(req.body)
        user.password = bcrypt.hashSync(req.body.password, 10)
        const saved = await user.save()
        user.password = undefined
        res.json(saved)
    } catch(err) {
        res.status(500).json({ errors: [err]})
    } 
}

exports.login = async function(req, res) {
    try{
        if (!req.body.password || !req.body.email) {
            return res.status(400).json({ message: "Informe a senha ou o email"})
        }
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(401).json({ message: "Usuário não encontrado!" })
        const isTheSame = bcrypt.compareSync(req.body.password, user.password)
        if (!isTheSame) return res.status(401).json({ message: "Email/ senha inválido!"})

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            id: user.id,
            name: user.name,
            email: user.password,
            iat: now,
            exp: now + (60 * 60 * 24 * 7)
        } 
        res.json({
            ...payload,
            token: jwt.encode(payload, process.env.SECRET)
        })
    }catch(err) {
        res.status(500).json({ errors: [err]})
    }
}

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next()
    } else {
        return res.status(401).json({ message: "Unauthorizated user"})
    }
}