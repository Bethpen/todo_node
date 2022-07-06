
let express = require('express');
let router = express.Router();
const controller = require('../controller/controller');


// api routes
router.post('/api/users', controller.create)
router.get('/api/users', controller.find)
router.put('/api/users/:id', controller.update)
router.delete('/api/users/:id', controller.delete)



module.exports = router