/* eslint-disable */


const router = require('express').Router();
const axios = require('axios');
const {User, Player} = require('../db/models');

module.exports = router;

router.get('/players', (req,res,next)=>{
  Player.findAll({where: {
    userId
  }})
  User.findById(req.sessions.passport.user)
    .then(user => {
      req.session.user = user;
      res.send('user found');
    });
})

router.post('/addplayer', (req,res,next)=>{

})
