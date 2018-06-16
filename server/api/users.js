const router = require('express').Router()
const {User, Player} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId/players', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.getPlayers())
    .then(players => res.json(players))
    .catch(next)
})

router.post('/', (req, res, next) => {

})

router.put('/:userId/add/:playerId', (req, res, next) => {
  Player.findById(req.params.playerId)
    .then(player => {
      player.setUser(req.params.userId);
      res.json(player);
    })
    .catch(next)
})

router.put('/:userId/remove/:playerId', (res, req, next) => {
  Player.findById(req.params.playerId)
    .then(player => {
      player.removeUser(req.params.userId);
      res.json(player);
    })
    .catch(next)
})

