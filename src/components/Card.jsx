import React from 'react'
import styles from './Card.module.scss'
import Badge from './Badge';
import {gsap} from "gsap"
import { element } from 'prop-types';


const settings={
  alphaMult:0.3,
  minY:-15,
  maxY:15,
  minX:-7,
  maxX:7,
  rotateDuration:0.15, // in s
  rotateFactor:100,
  rotateDelay:0.02,   // in s
  restoreTimeOut:200, // in ms
  restoreDuration:2   // in s

}

// console.log(styles);

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

		var percentX = (pageX-itemX)/itemW*100-17;
		var percentY = (pageY-itemY)/itemH*100-25;
    percentX=(percentX-50)/50;
    percentY=(percentY-50)/50;
    // console.log(percentX,percentY);

    let factorX=10;
    let factorY=20;

    let rotateX=percentY*factorX;
    let rotateY=percentX*factorY;

    // let diffY = settings.minY-settings.maxY; // -30
		// var rotateY = settings.minY-percentX/settings.rotateFactor*diffY;
    // rotateY = rotateY<settings.maxY ? settings.maxY : rotateY;
    // rotateY = rotateY>settings.minY ? settings.minY : rotateY;

	  // let diffX = settings.minX-settings.maxX;
		// var rotateX = settings.minX-percentY/settings.rotateFactor*diffX;
    // rotateX = rotateX<settings.minX ? settings.minX : rotateX;
    // rotateX = rotateX>settings.maxX ? settings.maxX : rotateX;
   
    // // console.log(rotateX,rotateY);
    let bg="";
    let alpha=Math.abs(percentX)*settings.alphaMult;
    
    // if(percentX>50) bg="radial-gradient(circle at center, rgba(0, 0, 0, "+alpha+"), transparent 50%)";
    // else bg="radial-gradient(circle at center, rgba(255, 255, 255, "+alpha+"), transparent 50%)";
    // bg="red";
    // console.log(this.q("."+styles.dark));
    gsap.to(this.q("."+styles.card),{
                      rotateX:rotateX,
                      rotateY:rotateY,
                      x:percentX*-factorX/2,
                      translateZ:5,
                      ease:"none",
                      duration:settings.rotateDuration,
                      delay:settings.rotateDelay,
                      boxShadow:(percentX+1)*factorY+"px "+(percentY-1)*-factorX+"px "+(percentX+1.5)*5+"px 0px rgba(0, 0, 0, 0.15)"
                    });
    gsap.to(this.q("."+styles.light),{
                      y:itemH/2,
                      x:((percentX-50)-pageX),
                      opacity:1,
                      background:bg
                    });
    gsap.to(this.q("."+styles.dark),{
                      y:itemH/2,
                      x:itemW-pageX,
                      opacity:1,
                      background:bg
                    });
    gsap.to(this.q("."+styles.pic),{
                      y:percentY*factorX/1.5,
                      x:percentX*factorY/1.5,
                      skewX:-percentX/3,
                      skewY:percentY/3,
                      scale:1.03,
                      transformOrigin:"100% 50%",
                      // boxShadow:"0px 0px 5px 0px inset rgba(0,0,0,0.4)"
                    });                

} 

restoreCard(){
  setTimeout(
    ()=>{
      gsap.to(this.q("."+styles.card),{
        rotateX:0,
        rotateY:0,
        rotateZ:0,
        ease:"power.out",
        duration:settings.restoreDuration,
        boxShadow:"5px 5px 10px rgba(0,0,0,0.15)"
      });
      gsap.to(this.q("."+styles.light),{opacity:0});
      gsap.to(this.q("."+styles.dark),{opacity:0});
      gsap.to(this.q("."+styles.pic),{
        y:0,
        x:0,
        skewX:0,
        skewY:0,
        scale:1,
        // boxShadow:"",
        transformOrigin:"50% 50%",
      });
    }
    ,settings.restoreTimeOut);
}

render(){
  return (
   
    <div ref={this.ref1} className={styles.container}>
      <div  ref={this.ref2} className={styles.card}  onMouseLeave={()=>this.restoreCard()} onMouseMove={this.updateRotation}> 
        <img className={styles.pic} src={this.props.src} alt="" />
        <div className={styles.info}>
          <h2>{this.props.name}</h2>
          <p>{this.props.description}</p>
          <div className={styles.badges}>
            {this.props.badges.map((element)=>(<Badge key={element} styling={this.props.badgesStyling}>{element}</Badge>))}
          </div>
        </div>
        <div className={styles.light}></div> 
        <div className={styles.dark}></div> 
      </div>
    </div>
   
  )
}
}

export default Card