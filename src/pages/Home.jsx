// import Cards from "../components/Cards";
import React, { useEffect, useState, useRef } from 'react'
import NewSlider from "../components/slider/NewSlider";
import gsap from 'gsap';

function Home(props) {
const server=props.settings.server;
// let sliderData=[];
const[sliderData,setSliderData]=useState([]);
// console.log("Rerender");
const [counter,setCounter]=useState(0);

const sliderRef=useRef();
const q = gsap.utils.selector(sliderRef);

const timerID=useRef();

useEffect(()=>{
  getSliderData();
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
    <div ref={sliderRef}>
        <NewSlider cursor={props.cursor} settings={props.settings} sliderData={sliderData} counter={counter}/>
        
        {/* <Cards/> */}

    </div>
  )
}

export default Home