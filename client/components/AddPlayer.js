import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlayers, fetchUserPlayers, postUserPlayer } from '../store'

/**
 * COMPONENT
 */
class AddPlayer extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchPlayers();
  }

  handleSubmit = event => {
    event.preventDefault();
    const playerId = event.target.playerId.value;
    console.log('event', playerId)
    //add player to user
    this.props.postUserPlayer(playerId);
  }

  render() {
    return (
      <div>
        <h3>Choose a player to add:</h3>
        <form onSubmit={this.handleSubmit}>
          <select name='playerId'>
            <option selected disabled hidden>Choose here</option>
            {
              this.props.players.map(player => {
                return (
                  <option key={player.id} value={player.id}>{player.last_name}, {player.first_name}</option>
                )
              })
            }
          </select>
          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    players: state.players
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlayers: () => dispatch(fetchPlayers()),
    postUserPlayer: playerId => dispatch(postUserPlayer(playerId))
  }
}

export default connect(mapState, mapDispatch)(AddPlayer)

