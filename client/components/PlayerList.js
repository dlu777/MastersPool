import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchUserPlayers} from '../store'

/**
 * COMPONENT
 */
class PlayerList extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchUserPlayers();
  }

  render() {
    return (
      <div>
        <h2>Here are your players:</h2>
            {
              this.props.players.map(player => {
                return (
                  <h4 key={player.id}>{player.last_name}, {player.first_name}</h4>
                )
              })
            }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    players: state.userPlayers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUserPlayers: () => dispatch(fetchUserPlayers())
  }
}

export default connect(mapState, mapDispatch)(PlayerList)

