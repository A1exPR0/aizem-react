import gsap from 'gsap';
import React, { useEffect } from 'react'
import Cards from '../components/Cards'

function Projects(props) {


  const q2 = gsap.utils.selector(props.appref);

  useEffect(()=>{
    gsap.fromTo(q2(".page"),{
      opacity:0,
      y:50
    },{
        opacity:1,
        y:0,
        duration:0.5
    });
  },[])

  return (
    <div className="page">
    <Cards/>
    </div>
  )
}

export default Projects