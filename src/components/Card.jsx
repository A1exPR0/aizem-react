import React from 'react'

function Card(props) {


  return (
    <div style={
        {
            'backgroundColor':props.color
        }
    }>
        <h2>{props.name}</h2>
    </div>
  )
}

export default Card