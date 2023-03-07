const express = require('express')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.send({ ok: 1 })
})

router.use('/login', require('./login')) 
router.use('/product', require('./product')) 
router.use('/order', require('./order')) 
router.use('/vehicle', require('./vehicle')) 
router.use('/report', require('./report')) 