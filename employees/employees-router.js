const express = require('express')

const Users = require('./employees-model')

const router = express.Router()

const bcrypt = require('bcryptjs')

const restricted = require('../auth/restricted.js')

const jwt = require('jsonwebtoken')
const secrets = require('../auth/secrets.js')

router.post('/register', (req, res) => {
    let employee = req.body

    const hash = bcrypt.hashSync(employee.password)
    employee.password = hash

    Users.add(employee)
        .then(addedEmployee => {
            const token = generateToken(employee)
            const added = { username: addedEmployee.username, role: addedEmployee.role}
            res.status(201).json({employee: added, token})
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add employee'})
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    console.log("login", req.body)
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
            const loggedInUser = req.user.username
            const role = req.user.role
            const newList = employees.filter(x => {
                if (x.role.toLowerCase() == role.toLowerCase()) {
                    return x
                }
            })
            res.json(newList)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to fetch users'})
        })
})

router.post('/allemployees', (req,res) => {
    let { password } = req
    const defaultPassword = 'password123'
    
    console.log(req.body)
    Users.find()
        .then(employees => {
            // console.log(req.body)
                res.status(200).json(employees)
        })
        .catch(error => {
            res.status(500).json({ message: 'could not fetch employees'})
        })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secrets.jwtSecret, options)


}

module.exports = router

//comment