import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import gsap from 'gsap';



function Slider(props) {

    let contRef = useRef();
    const q = gsap.utils.selector(contRef);
    const server="10.0.0.169";
    // const server="localhost";


    const [sliderData, setSliderData] = useState([]);
    const [sliderReady, setSliderReady] = useState(false);

    useEffect(() => {
        console.log("use effect started");
        getSliderData();
        initSlider();
        let timerID = setInterval(() => {
            slideOut();
        }, 5000);
        return(() => {
            clearInterval(timerID);
        })
    },[])

    const getSliderData = async() => {
        const ls=localStorage.getItem('SliderData');
        if(ls){
            setSliderData(JSON.parse(ls));
            console.log("Data for slider set from Local storage");

        }
        else{
            const response = await fetch("http://"+server+":1337/api/home-page?populate=pair.noDesign%2Cpair.withDesign");
            const data = await response.json();
            
            localStorage.setItem('SliderData',JSON.stringify(data.data.attributes.pair));
            console.log("Data for slider set from api call"); 
            console.log(data.data.attributes.pair);
            setSliderData(data.data.attributes.pair);
            };
    }



    const initSlider=()=>{
        console.log("init slider here");
        const items=document.querySelectorAll(".slider-items");
       if(items.length>0){
        items.forEach((item,i)=>{
            if(i!=0){
                console.log(item.style.display);
                item.style.display="none";
            }
        });
        setSliderReady(true);
    }

    }

    const movePairDown = (target) => {
        // const parent = target.parentNode;
        // parent.append(parent.lastChild, target);
        // // console.log(parent);
        // gsap.to(target, {
        //     x: 100,
        //     opacity: 0,
        //     display: "block",
        //     onComplete: slideIn
        // });

    }

    const slideIn = () => {
        // gsap.to(q(".slider-items:nth-of-type(1)"), {
        //     x: 0,
        //     opacity: 1
        // });

    }

    const slideOut = () => {
        // sliderData.pop();


        // gsap.to(q(".slider-items:nth-of-type(1)"), {
        //     x: -100,
        //     opacity: 0,
        //     display: "none",
        //     onComplete: movePairDown,
        //     onCompleteParams: q(".slider-items:nth-of-type(1)")
        // });

    };

    return(
        <SliderWrapper>
            <div className="slider-container"
                ref={contRef}>
             
                <p>Slider</p>
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
    <filter id="mask-blur">
      <feGaussianBlur stdDeviation="5" />
    </filter>
                    <mask id="mask">
                <circle cx={props.cursor.x} cy={props.cursor.y} fill="white" r={"70px"} width="70px" height="70px" filter="url(#mask-blur)" />
                </mask>
                </defs>
                {sliderReady &&
                <g className='slider-items' key={sliderData[0].id}>
                        <image xlinkHref={"http://"+server+":1337"+sliderData[0].noDesign.data.attributes.url}  x="0" y="0"></image>    
                        <image xlinkHref={"http://"+server+":1337"+sliderData[0].withDesign.data.attributes.url} mask="url(#mask)" x="0" y="0"></image>  
                        </g>}
                {/* {sliderData.map((pair)=>{
                    return(<g className='slider-items' key={pair.id}>
                        <image xlinkHref={"http://"+server+":1337"+pair.noDesign.data.attributes.url}  x="0" y="0"></image>    
                        <image xlinkHref={"http://"+server+":1337"+pair.withDesign.data.attributes.url} mask="url(#mask)" x="0" y="0"></image>  
                        </g>);
                })} */}
                </svg>

                {/* <div className="slider-items">
                    <img src="images/outdoor_Design.png" alt=""/>
                    <img src="images/outdoor_blank.png" alt=""/>
                </div>
                <div className="slider-items">
                    <img src="images/Scene 29.png" alt=""/>
                    <img src="images/Scene 29_nodesign.png" alt=""/>
                </div> */}
                

            </div>

        </SliderWrapper>
    )
    
}

export default Slider


const SliderWrapper = styled.div `

svg{
    width:100vw;
    height:100vw;
    position:fixed;
    top:0px;
    left:0;
    z-index:100;
    circle{
        transform:translate(-20px,-20px);
    }
}
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
        image{
            // mask:url(#mask2);
            margin-top:auto;
            width:100%;
            height:100%;
            position:absolute;
            background-color:white;
        
            &:nth-child(even){
                z-index:1;
            }
            &:nth-child(odd){
                z-index:2;
                // mask:url(#mask2);
            }
        
        }

    }
    
}

`;

