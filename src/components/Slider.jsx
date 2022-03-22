import React, {Component} from 'react'
import styled from 'styled-components'
import gsap from 'gsap';


export default class Slider extends Component {
    constructor(props){
        super(props);
    
    // const tl=gsap.timeline().
    }

    slideLeft(){
    // this.tl.to(",slider-itmes img",{x:-100});
    }

  render() {
      this.slideLeft();
    return (
        <SliderWrapper>
        <div className="slider-container">
            <div className="slider-items">
            <img src="images/boxes_nodesign.png" alt="" />
            <img src="images/boxes_design.png" alt="" />
            <img src="images/outdoor_blank.png" alt="" />
            <img src="images/outdoor_Design.png" alt="" />
            <img src="images/Scene 29_nodesign.png" alt="" />
            <img src="images/Scene 29.png" alt="" />
            </div> 
        </div>   

        </SliderWrapper>
    )
  }
}

const SliderWrapper = styled.div`
.slider-container{
display:block;
width:788px;
height:568px;
overflow:hidden;
margin-left:auto;
    .slider-items{
        width:100%;
        height:100%;
        position:relative;
        display:flex;
        align-items:end;
            img{
                margin-top:auto;
                width:100%;
                height:100%;

                position:absolute;
                background-color:white;
           
            &:nth-child(even){
                z-index:0
            }
            &:nth-child(odd){
                z-index:1
            } }

    }
}
`
;