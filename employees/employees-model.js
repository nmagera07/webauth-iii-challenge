const db = require('../database/dbConfig.js')

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('employees')
        .select('id', 'username', 'role')
}

function findBy(filter) {
    return db('employees')
        .where(filter)
}

function add(user) {
    return db('employees')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

function findById(id) {
    return db('employees')
        .where({ id })
        .first()
}