const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const EmployeesRouter = require('./employees/employees-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use('/', EmployeesRouter)

server.get('/', (req,res) => {
    res.status(200).json({ message: 'You are connected!!!'})
})


module.exports = server