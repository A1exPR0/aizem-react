import gsap from 'gsap';
import React, { useEffect } from 'react'
import Cards from '../components/Cards'

function Projects(props) {


  return (
    <div className="page">
      <div style={{width:"100vw",height:"100vh"}}></div>
    <Cards appref={props.appref}/>
    </div>
  )
}

export default Projects