var express = require('express')
var router = express.Router()
const { isEmpty } = require('lodash')
var passport = require('passport')

const Resto = require('../models/Resto')
const resFormat = require('../helpers/responseFormat')
let constants = require('../config/constants')
const messages = require('../config/messages')

//function to create new resto
create = (req, res) => {
  try {
    let resto = new Resto()
    resto = Object.assign(resto, req.body)
    resto.isActive = true
    resto.save(async (err, newResto) => {
      if (err) {
        console.log('err', err)
        res.status(500).send(resFormat.rError(err))
      } else {
        res.send(resFormat.rSuccess('Successfully onboarded restaurant!'))
      }
    })
  } catch(e) {
    res.send(resFormat.rError(messages.somethingWentWrong))
  }
}


router.post("/onboard", create)

module.exports = router
