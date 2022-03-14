import React, { useState } from 'react'
import { useRef } from 'react';
import styled from 'styled-components';
import {gsap} from "gsap"

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state={
      x:0,
      y:0
    }
    this.el1=React.createRef();
    this.el2=React.createRef();
    this.q=gsap.utils.selector(this.el1);
  }

updateRotation=(e)=>{
  const width=this.el2.current.clientWidth;
  const height=this.el2.current.clientHeight;
  const ox=e.nativeEvent.offsetX;
  const oy=e.nativeEvent.offsetY;
  const factorX=-0.05;
  const factorY=0.07;
  const parX=(ox-width/2)*factorX;
  const parY=(oy-height/2)*factorY;
  this.setState({
    x:parX,
    y:parY}
  )
  const parZ=(parX*parY)/height;
//  console.log(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
  // console.log(parX,parY,parZ);
  // console.log(width,height);
  gsap.to(this.q("div"),{rotateX:parX,rotateY:parY,rotateZ:parZ,ease:"power.in"});

  this.setState({
    x:ox,
    y:oy
  })
} 
  
rotateCard(){

  
}

restoreCard(){
  gsap.to(this.q("div"),{rotateX:0,rotateY:0,ease:"none"});
}

render(){

  const {x,y} = this.state;
  // const shadow=toString(x)+"px "+toString(y)+"px 15px rgba(0,0,0,0.50)";
  return (
   
    <div ref={this.el1} style={{margin:"20px"}}>
    <CardWrapper  ref={this.el2} className="card"  onMouseLeave={()=>this.restoreCard()} onMouseMove={this.updateRotation} style={
        {
            backgroundColor:this.props.color,
        }
    }> 
        <h2 >{this.props.name}</h2>
        <img src={this.props.src} alt="" />
       
    </CardWrapper>
    </div>
   
  )
}
}
const CardWrapper = styled.div`
padding:5rem;
border-radius:1rem;
width:400px;
color:white;
box-shadow: 3px 3px 20px rgba(0,0,0,0.25);
img {
  width:100%;
  height:auto;  
  }
`;

export default Card