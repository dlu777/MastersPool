const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rank: {
    type: Sequelize.INTEGER,
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('user'),
      }]
    })
  }
})

module.exports = Player;
