import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading"height="300px" width="300px" />
        <h3>Loading...</h3>
      </div>
    )
  }
}
