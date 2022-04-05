import Cards from "../components/Cards";
import React, { useEffect, useState, useRef, useContext } from 'react'

import NewSlider from "../components/slider/NewSlider";
import TextTest from '../components/TextTest';
import Button from '../components/Button';

import styles from "./Home.module.scss"

import gsap from 'gsap';
import myContext from '../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

  const arrow = <FontAwesomeIcon icon={faCaretDown} style={{marginLeft:"0.2em"}}/>

const settings={
  sliderInterval:5000, // in ms
  sliderX:100,
  sliderDelay:0.3,
  revealY:50
};

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
    y:settings.revealY
  },{
      opacity:1,
      y:0
  });
},[])



useEffect(()=>{
  timerID.current=setInterval(()=>{


    gsap.to(q("image"), {
                x: -settings.sliderX,
                opacity: 0,
              onComplete:()=>{
                
                if(counter+1 < sliderData.length) {setCounter(counter+1);}
                else{setCounter(0);}
                gsap.fromTo(q("image"), {
                                    x: settings.sliderX,
                                    opacity: 0
                                },{
                                  x:0,
                                  opacity:1,
                                  delay:settings.sliderDelay
                                });        

              }});

  
    },settings.sliderInterval);
    return (()=>{
      clearInterval(timerID.current);
    })
},[counter,sliderData])


  const getSliderData = async() => {
    const ls=localStorage.getItem('SliderData');

    if(ls){
      setSliderData(JSON.parse(ls));
        // console.log("Data for slider set from Local storage");

    }
    else{
        const response = await fetch("http://"+server+":1337/api/home-page?populate=pair.noDesign%2Cpair.withDesign");
        const data = await response.json();
        
        localStorage.setItem('SliderData',JSON.stringify(data.data.attributes.pair));
        // console.log("Data for slider set from api call"); 
        // console.log(data.data.attributes.pair);
        setSliderData(data.data.attributes.pair);
        };
      

}

// console.log(arrow);
  return (
    <div className={'page'} ref={sliderRef} onMouseMove={updateCursor}>
      <div className={styles.section}>
        <TextTest appref={props.appref}/>
        <div className={styles.buttons}>
          <Button href="#" styling="orange">Свяжитесь с нами</Button>
          <Button href="#" styling="white">Наши работы{arrow}</Button>
        </div>
      </div>
        <NewSlider sliderData={sliderData} counter={counter}/>

        {/* <Cards/> */}
    </div>
  )
}

export default Home