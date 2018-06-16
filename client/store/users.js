import axios from 'axios'
import history from '../history'

//action types

const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const EDIT_USER = 'EDIT_USER';
const DELETE_USER = 'DELETE_USER';

// action creators

const getUsers = users => ({type: GET_USERS, users});
const createUser = user => ({type: CREATE_USER, user});
const editUser = user => ({type: EDIT_USER, user});
const deleteUser = id => ({type: DELETE_USER, id});

//thunk creators

export const fetchUsers = () =>
  dispatch => {
    axios.get('/api/users')
      .then(res => dispatch(getUsers(res.data)))
      .catch(err => console.log(err))
  }

export const postUser = user =>
  dispatch => {
    axios.post('/api/users', user)
      .then(res => dispatch(createUser(res.data)))
      .catch(err => console.log(err))
  }

export const updateUser = (user, id) =>
  dispatch => {
    axios.put(`/api/users/${id}`, user)
      .then(res => dispatch(editUser(res.data)))
      .catch(err => console.log(err))
  }
export const destroyUser = id =>
  dispatch =>
    axios.delete(`api/users/${id}`)
      .then(() => dispatch(deleteUser(id)))
      .catch(err => console.error(`Removing user: ${id} unsuccessful`, err));

//reducers

export default function (users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...users, action.user];
    case EDIT_USER:
      return users.map(user => (action.user.id === user.id ? action.user : user))
    case DELETE_USER:
      return users.filter(user => (user.id !== action.id))
    default:
      return users
  }

}
