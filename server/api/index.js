const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/players', require('./players'))
router.use('/session', require('./session'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
