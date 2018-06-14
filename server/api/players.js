const router = require('express').Router();
const {User, Player} = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Player.findAll()
    .then(players => res.json(players))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then(player => player.update(req.body))
    .then(player => res.json(player))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Player.destroy({where: {id: req.params.id}})
    .then(() => res.status(204).end())
    .catch(next)
})
