const express = require('express')
const bodyParser = require('body-parser')
const reportCtrl = require('../controller/report')

const router = express.Router()

module.exports = router

router.post('/',[bodyParser.json()], reportCtrl.getreport)