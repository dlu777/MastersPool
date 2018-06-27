/* eslint-disable */


const router = require('express').Router();
const axios = require('axios');
const {User, Player, UserPlayer} = require('../db/models');

module.exports = router;

router.get('/players', (req,res,next)=>{
  console.log('req.session', req.session)
      Player.findAll({
        through: {
          model: UserPlayer,
          where: {
            userId: parseInt(req.session.passport.user)
          }
        }
      })
        .then(players => res.json(players))
})

router.get('/add-player/:playerId', (req,res,next)=>{
  User.findById(parseInt(req.session.passport.user))
    .then(user => {
      Player.findById(req.params.playerId)
        .then(player => {
          console.log('player', player, 'user', user)
          player.addUser(user)
        })
      res.json(player)
    })
})

router.get('/remove-player/:playerId', (req, res, next) => {
  Player.findAll({where: {
    userId: parseInt(req.session.passport.user)
  }})
    .then(players => res.json(players))
})
