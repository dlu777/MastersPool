import Sequelize from 'sequelize';
import db from '../db';

export default Player = db.define('player', {
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
