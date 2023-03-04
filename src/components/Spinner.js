import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src="./hourglass.gif" alt="loading.." style={{cursor:'wait'}} />
      </div>
    )
  }
}
