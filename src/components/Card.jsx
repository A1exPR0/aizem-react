import React from 'react'
import styled from 'styled-components';
import styles from './Card.module.scss'
import {gsap} from "gsap"


const settings={
  alphaMult:0.3,
  minY:15,
  maxY:-15,
  minX:-12,
  maxX:12,
  rotateDuration:0.15, // in s
  rotateFactor:60,
  rotateDelay:0.02,   // in s
  restoreTimeOut:200, // in ms
  restoreDuration:2   // in s

}

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state={
      x:0,
      y:0
    }
    this.ref1=React.createRef();
    this.ref2=React.createRef();
    this.q=gsap.utils.selector(this.ref1);
  }

updateRotation=(e)=>{

    let itemContainer=e.currentTarget;


    var pageX = e.pageX;
		var pageY = e.pageY;
		var itemX = itemContainer.offsetLeft+itemContainer.offsetParent.offsetLeft;
		var itemY = itemContainer.offsetTop+itemContainer.offsetParent.offsetTop;
		var itemW = itemContainer.clientWidth;
		var itemH = itemContainer.clientHeight;

		var percentX = (pageX-itemX)/itemW*100;
		var percentY = (pageY-itemY)/itemH*100;
    
    let diffY = settings.minY-settings.maxY;
		var rotateY = settings.minY-percentX/settings.rotateFactor*diffY;
    rotateY = rotateY<settings.maxY ? settings.maxY : rotateY;
    rotateY = rotateY>settings.minY ? settings.minY : rotateY;
	  let diffX = settings.minX-settings.maxX;
		var rotateX = settings.minX-percentY/settings.rotateFactor*diffX;
    rotateX = rotateX<settings.minX ? settings.minX : rotateX;
    rotateX = rotateX>settings.maxX ? settings.maxX : rotateX;

    let bg="";
    let alpha=Math.abs(percentX-50)/50*settings.alphaMult;

    if(percentX>50) bg="radial-gradient(circle at center, rgba(0, 0, 0, "+alpha+"), transparent 50%)";
    else bg="radial-gradient(circle at center, rgba(255, 255, 255, "+alpha+"), transparent 50%)";

    gsap.to(this.q("."+styles.card),{rotateX:rotateX,rotateY:rotateY,ease:"none",duration:settings.rotateDuration,delay:settings.rotateDelay});
    gsap.to(this.q("."+styles.light),{top:itemH/2,left:pageX-itemX,opacity:1,background:bg});

} 

restoreCard(){
  setTimeout(
    ()=>{
      gsap.to(this.q("."+styles.card),{rotateX:0,rotateY:0,rotateZ:0,ease:"power.out",duration:settings.restoreDuration});
      gsap.to(this.q("."+styles.light),{opacity:0});
    }
    ,settings.restoreTimeOut);
}

render(){
  return (
   
    <div ref={this.ref1} style={{margin:"20px"}}>
    <div  ref={this.ref2} className={styles.card}  onMouseLeave={()=>this.restoreCard()} onMouseMove={this.updateRotation} style={
        {
            backgroundColor:this.props.color,
        }
    }> 
        <h2>{this.props.name}</h2>
        <img src={this.props.src} alt="" />
        <div className={styles.light}></div>
       
    </div>
    </div>
   
  )
}
}

export default Card