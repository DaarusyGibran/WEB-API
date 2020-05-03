const express = require('express');
const router = express.Router();
 
const c = require('./roles.controller')

const { auth } = require('../../../secret');
 
// router.get('/', c.findAll)
// router.get('/:id', c.findById)
// router.post('/',  c.insert)
// router.put('/:id', c.updateById)
// router.delete('/:id', c.removeById)
// router.delete('/', c.remove)

router.get('/', auth, c.findAll)
router.get('/:id', auth, c.findById)
router.post('/', auth,  c.insert)
router.put('/:id', auth, c.updateById)
router.delete('/', auth, c.remove)
router.delete('/:id', auth, c.removeById)
 
module.exports = router;