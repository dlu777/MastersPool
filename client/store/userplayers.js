import axios from 'axios'
import history from '../history'

//action types

const GET_USERPLAYERS = 'GET_USERPLAYERS';
const ADD_USERPLAYER = 'ADD_USERPLAYER';
const DELETE_USERPLAYER = 'DELETE_USERPLAYER';

// action creators

const getUserPlayers = players => ({type: GET_USERPLAYERS, players});
const addUserPlayer = player => ({type: ADD_USERPLAYER, player});
const deleteUserPlayer = id => ({type: DELETE_USERPLAYER, id});


//thunk creators

export const fetchUserPlayers = () =>
  dispatch => {
    axios.get(`/api/session/players`)
      .then(res => dispatch(getUserPlayers(res.data)))
      .catch(err => console.log(err))
  }

export const postUserPlayer = playerId =>
  dispatch => {
    axios.get(`/api/session/add-player/${playerId}`)
      .then(res => dispatch(addUserPlayer(res.data)))
      .catch(err => console.log(err))
  }

export const destroyUserPlayer = playerId =>
  dispatch =>
    axios.get(`api/session/remove-player/${playerId}`)
      .then(() => dispatch(deleteUserPlayer(playerId)))
      .catch(err => console.error(`Removing player: ${playerId} unsuccessful`, err));

//reducers

export default function (userPlayers = [], action) {
  switch (action.type) {
    case GET_USERPLAYERS:
      return action.players;
    case ADD_USERPLAYER:
      return [...userPlayers, action.player];
    case DELETE_USERPLAYER:
      return userPlayers.filter(player => (player.id !== action.id))
    default:
      return userPlayers
  }

}
