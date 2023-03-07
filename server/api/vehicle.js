const express = require('express')
const bodyParser = require('body-parser')
const vehicleCtrl = require('../controller/vehicle')

const router = express.Router()

module.exports = router

router.get('/',[bodyParser.json()], vehicleCtrl.getVehicle)
router.get('/dropdown',[bodyParser.json()], vehicleCtrl.getDropdownVehicle)