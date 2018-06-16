/* eslint-disable */


const router = require('express').Router();
const axios = require('axios');
const {User, Player} = require('../db/models');

module.exports = router;

router.get('/players', (req,res,next)=>{
  Player.findAll({where: {
    userId: parseInt(req.sessions.passport.user)
  }})
})

router.post('/add-player', (req,res,next)=>{

})

router.delete('/remove-player')
