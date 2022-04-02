// import Cards from "../components/Cards";
import React, { useEffect, useState, useRef, useContext } from 'react'
import NewSlider from "../components/slider/NewSlider";

import gsap from 'gsap';
import myContext from '../Context';



function Home(props) {

const {server,updateCursor}=useContext(myContext);

const[sliderData,setSliderData]=useState([]);

const [counter,setCounter]=useState(0);

const sliderRef=useRef();
const q = gsap.utils.selector(sliderRef);

const timerID=useRef();

const q2 = gsap.utils.selector(props.appref);

useEffect(()=>{
  getSliderData();
  gsap.fromTo(q2(".page"),{
    opacity:0,
    y:50
  },{
      opacity:1,
      y:0
  });
},[])



useEffect(()=>{
  timerID.current=setInterval(()=>{


    gsap.to(q("image"), {
                x: -100,
                opacity: 0,
              onComplete:()=>{
                
                // console.log("end of animation");
                if(counter+1 < sliderData.length) {
                  // console.log("increment");
                  setCounter(counter+1);
                }
                else{
                  // console.log("reset");
                  // console.log(sliderData.length);
                  setCounter(0);
                }

                gsap.fromTo(q("image"), {
                                    x: 100,
                                    opacity: 0
                                },{
                                  x:0,
                                  opacity:1,
                                  delay:0.3
                                });        

              }});

  
    },5000);
    return (()=>{
      clearInterval(timerID.current);
    })
},[counter,sliderData])


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
        // console.log(data.data.attributes.pair);
        setSliderData(data.data.attributes.pair);
        };
      

}

// console.log(sliderData);
  return (
    <div className='page' ref={sliderRef} onMouseMove={updateCursor}>
        <NewSlider sliderData={sliderData} counter={counter}/>
        {/* <Cards/> */}
    </div>
  )
}

export default Home