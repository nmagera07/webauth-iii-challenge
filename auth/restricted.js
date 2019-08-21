const jwt = require('jsonwebtoken');

const secrets = require('../auth/secrets.js');

module.exports = 

function restricted(req, res, next) {
  const token = req.headers.authorization;

  // check that the token is valid
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        // token is goooooooood
        req.user = { username: decodedToken.username, role: decodedToken.role }
        console.log(req.user)
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'please login to view users' });
  }
};







// const bcrypt = require('bcryptjs')

// const Employees = require('../employees/employees-model.js')

// module.exports = 

// function restricted(req, res, next) {
//     let { username, password } = req.headers

//     if (username && password) {
//         Employees.findBy({ username })
//             .first()
//             .then(user => {
//                 if (user && bcrypt.compareSync(password, user.password)) {
//                     next()
//                 } else {
//                     res.status(401).json({ message: 'You shall not pass!!'})
//                 }
//             })
//             .catch(error => {
//                 res.status(500).json({ message: 'Failed to fetch users'})
//             }) 
//     }
// }