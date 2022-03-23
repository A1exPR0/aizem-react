import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import gsap from 'gsap';


function Slider() {

    const [activeSlide, setActiveSlide] = useState(6);
    let contRef=useRef();
    const q = gsap.utils.selector(contRef);
    useEffect(() => {
        let timerID = setInterval(() => {
            slideLeft();
        }, 5000);
        return(()=>{
            clearInterval(timerID);
        })
    })


    const slideLeft=()=> {
  
        gsap.to(q(".slider-items img:nth-of-type(" + activeSlide + ")"), {
            x: -100,
            opacity: 0,
            display: "none"
        });
        setActiveSlide(activeSlide - 1);
        if (activeSlide < 1) {
            setActiveSlide(6);
            clearInterval(this.timerID);
        }
    };

    return (
        <SliderWrapper>
            <div className="slider-container"
                ref={
                    contRef
            }>
                <p>{activeSlide}</p>
                <div className="slider-items">
                    
                    <img src="images/boxes_design.png" alt=""/>
                    <img src="images/boxes_nodesign.png" alt=""/>
                    
                    <img src="images/outdoor_Design.png" alt=""/>
                    <img src="images/outdoor_blank.png" alt=""/>
                    
                    <img src="images/Scene 29.png" alt=""/>
                    <img src="images/Scene 29_nodesign.png" alt=""/>
                </div>
            </div>
        </SliderWrapper>
    )
}

export default Slider


const SliderWrapper = styled.div `
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
               // z-index:0
            }
            &:nth-child(odd){
               // z-index:1
            } }

    }
}
`;
