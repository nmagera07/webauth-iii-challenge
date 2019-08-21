const express = require('express')

const Users = require('./employees-model')

const router = express.Router()

const bcrypt = require('bcryptjs')

const restricted = require('../auth/restricted.js')

const jwt = require('jsonwebtoken')
const secrets = require('../auth/secrets.js')

router.post('/register', (req, res) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password)
    user.password = hash

    Users.add(employee)
        .then(addedEmployee => {
            const token = generateToken(user)
                
            res.status(201).json({addedEmployee, token})
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add employee'})
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ message: `Welcome ${user.username}!`, token})
            } else {
                res.status(401).json({ message: 'You shall not pass!!'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to login'})
        })
})

router.get('/employees', restricted, (req, res) => {
    Users.find()
        .then(employees => {
            res.json(employees)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to fetch users'})
        })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secrets.jwtSecret, options)


}

module.exports = router

//comment