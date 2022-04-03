import React from 'react'
import styled from 'styled-components';
import styles from './Card.module.scss'
import {gsap} from "gsap"

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
// console.log(e.nativeEvent.layerX,e.nativeEvent.layerY);
  // const width=this.ref2.current.clientWidth;
  // const height=this.ref2.current.clientHeight;
  // console.log(e.pageY);
  // const ox=e.nativeEvent.layerX;//+e.target.offsetLeft;
  // const oy=e.nativeEvent.layerY;//+e.target.offsetTop;
  // const factorX=-0.15;
  // const factorY=-0.1;
  // const parX=(ox-width/2)*factorX;
  // const parY=(oy-height/2)*factorY;
  // // this.setState({
  // //   x:parX,
  // //   y:parY}
  // // )
  // const parZ=(parX*parY)/height*3;
// console.log(ox,oy);
//  console.log(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
  // console.log(parX,parY,parZ);
  // console.log(width,height);
  // if(ox>50 && oy>50)
    let itemContainer=e.currentTarget;


    var pageX = e.pageX;
		var pageY = e.pageY;
		var itemX = itemContainer.offsetLeft+itemContainer.offsetParent.offsetLeft;
		var itemY = itemContainer.offsetTop+itemContainer.offsetParent.offsetTop;
		var itemW = itemContainer.clientWidth;
		var itemH = itemContainer.clientHeight;
    // console.log(e);
    // console.log("for cursor pageX:"+pageX+" pageY:"+pageY);
    // console.log("for element width:"+itemW+" height:"+itemH);
    // console.log("for element offsetX:"+itemX+" offsetY:"+itemY);
		var percentX = (pageX-itemX)/itemW*100;
		var percentY = (pageY-itemY)/itemH*100;
    // console.log("percentX:"+percentX+" percentY:"+percentY);
    
		var minY = 7, maxY = -7, diffY = minY-maxY;
		var rotateY = minY-percentX/60*diffY;
    rotateY = rotateY<maxY ? maxY : rotateY;
    rotateY = rotateY>minY ? minY : rotateY;
		var minX = -9, maxX = 9, diffX = minX-maxX;
		var rotateX = minX-percentY/60*diffX;
    rotateX = rotateX<minX ? minX : rotateX;
    rotateX = rotateX>maxX ? maxX : rotateX;
    // console.log("rotateX:"+rotateX+" rotateY:"+rotateY);
    let bg="";
    let alpha=Math.abs(percentX-50)/50*0.2;
    // console.log(alpha);

    if(percentX>50) bg="radial-gradient(circle at center, rgba(0, 0, 0, "+alpha+"), transparent 50%)";
    else bg="radial-gradient(circle at center, rgba(255, 255, 255, "+alpha+"), transparent 50%)";

    gsap.to(this.q("."+styles.card),{rotateX:rotateX,rotateY:rotateY,ease:"power.in",duration:0.1});
    gsap.to(this.q("."+styles.light),{top:itemH/2,left:pageX-itemX,opacity:1,background:bg});


  // this.setState({
  //   x:ox,
  //   y:oy
  // })

} 

restoreCard(){
  setTimeout(
    ()=>{
      console.log("Tick");
      gsap.to(this.q("."+styles.card),{rotateX:0,rotateY:0,rotateZ:0,ease:"power.out",duration:2});
      gsap.to(this.q("."+styles.light),{opacity:0});
    }
    ,200);
}

render(){

  // const {x,y} = this.state;
  // const shadow=toString(x)+"px "+toString(y)+"px 15px rgba(0,0,0,0.50)";
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
// const CardWrapper = styled.div`
// padding:5rem;
// border-radius:1rem;
// width:400px;
// color:white;

// box-shadow: 3px 3px 20px rgba(0,0,0,0.25);
// img {
//   width:100%;
//   height:auto;  
//   }
// `;

export default Card