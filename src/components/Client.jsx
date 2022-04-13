import React from 'react'


function Client(props) {


  return (
    <div onMouseEnter={props.enter} onMouseLeave={props.leave}>
        <img src={props.img}></img>
    </div>
  )
}

export default Client