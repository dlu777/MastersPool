import React, {Component} from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class AddPlayer extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AddPlayer)

