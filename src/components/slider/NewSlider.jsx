import React, { useRef, useState, useEffect } from 'react'
import styles from './NewSlider.module.scss'
import gsap from 'gsap';
import SliderPair from './SliderPair'

function NewSlider(props) {
  const server=props.settings.server;
  
  const test=true;

    return (
    <div>
    {test &&  <div  className="test">
    <p>cursor is {props.cursor.x} and {props.cursor.y}</p>
    <p>server is {server}</p>
    <p>counter is {props.counter}</p>
    </div>}

    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" >
      <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <mask id="mask">
            <circle cx={props.cursor.x} cy={props.cursor.y} fill="white" r={"70px"} width="70px" height="70px" filter="url(#mask-blur)" />
          </mask>
      </defs>  

      
    <SliderPair sliderData={props.sliderData} settings={props.settings} counter={props.counter}/>
    </svg>
    </div>
  )
}



export default NewSlider