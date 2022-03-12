import React from 'react'
import { useRef } from 'react';
import styled from 'styled-components';
import {gsap} from "gsap"

function Card(props) {
  const el=useRef();
  const q=gsap.utils.selector(el);

function rotateCard(){
  gsap.to(q(".card"),{rotateX:30,rotateY:20});
}

function restoreCard(){
  gsap.to(q(".card"),{rotateX:0,rotateY:0});
}

  return (
    <div ref={el}>
    <CardWrapper   className="card" onMouseEnter={()=>rotateCard()} onMouseLeave={()=>restoreCard()}style={
        {
            'backgroundColor':props.color
        }
    }>
        <h2 >{props.name}</h2>
    </CardWrapper>
    </div>
  )
}
const CardWrapper = styled.div`
padding:2rem;
border-radius:1rem;
width:50%;
margin:2rem auto;
color:white;
`;

export default Card