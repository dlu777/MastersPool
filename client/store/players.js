import axios from 'axios'
import history from '../history'

//action types

const GET_PLAYERS = 'GET_PLAYERS';
const CREATE_PLAYER = 'CREATE_PLAYER';
const EDIT_PLAYER = 'EDIT_PLAYER';
const DELETE_PLAYER = 'DELETE_PLAYER';

// action creators

const getPlayers = players => ({type: GET_PLAYERS, players});
const createPlayer = player => ({type: CREATE_PLAYER, player});
const editPlayer = player => ({type: EDIT_PLAYER, player});
const deletePlayer = id => ({type: DELETE_PLAYER, id});

//thunk creators

export const fetchPlayers = () =>
  dispatch => {
    axios.get('/api/players')
      .then(res => dispatch(getPlayers(res.data)))
      .catch(err => console.log(err))
  }

export const postPlayer = player =>
  dispatch => {
    axios.post('/api/players', player)
      .then(res => dispatch(createPlayer(res.data)))
      .catch(err => console.log(err))
  }

export const updatePlayer = (player, id) =>
  dispatch => {
    axios.put(`/api/players/${id}`, player)
      .then(res => dispatch(editPlayer(res.data)))
      .catch(err => console.log(err))
  }
export const destroyPlayer = id =>
  dispatch =>
    axios.delete(`api/players/${id}`)
      .then(() => dispatch(deletePlayer(id)))
      .catch(err => console.error(`Removing player: ${id} unsuccessful`, err));

//reducers

export default function (players = [], action) {
  switch (action.type) {
    case GET_PLAYERS:
      return action.players;
    case CREATE_PLAYER:
      return [...players, action.player];
    case EDIT_PLAYER:
      return players.map(player => (action.player.id === player.id ? action.player : player))
    case DELETE_PLAYER:
      return players.filter(player => (player.id !== action.id))
    default:
      return players
  }

}
