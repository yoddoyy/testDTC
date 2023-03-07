const express = require('express')
const bodyParser = require('body-parser')
const orderCtrl = require('../controller/order')

const router = express.Router()

module.exports = router

router.get('/',[bodyParser.json()], orderCtrl.getOrder)
router.post('/',[bodyParser.json()], orderCtrl.addOrder)
router.get('/edit',[bodyParser.json()], orderCtrl.getOrderbyId)
router.put('/edit',[bodyParser.json()], orderCtrl.updateOrder)