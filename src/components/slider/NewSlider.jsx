
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './NewSlider.module.scss'
import SliderPair from './SliderPair'
import myContext from '../../Context'

function NewSlider(props) {
  const {server,cursor,updateCursor}=useContext(myContext);

  const svgRef=useRef();
  
  const [svgHW,setSvgHW]=useState({});
  useEffect(()=>{
    let el=document.querySelector("."+styles.svg);
    let elStyles=getComputedStyle(el);
    let svgWidth=elStyles.width;
    let svgHeight=elStyles.height;
    svgHeight=Number(svgHeight.slice(0,svgHeight.length-2));
    svgWidth=Number(svgWidth.slice(0,svgWidth.length-2));
    setSvgHW({w:svgWidth,h:svgHeight});
  },[]);

  const viewWidth=window.visualViewport.width;
  const viewHeight=window.visualViewport.height;
  

  const test=false;



    return (
    <div>
        {test &&  <div  className="test">
        <p>cursor is {cursor.x} and {cursor.y}</p>
        <p>server is {server}</p>
        <p>counter is {props.counter}</p>
        <p>ViewPort is {viewWidth} and {viewHeight}</p>
        </div>}

    <svg ref={svgRef} className={styles.svg} xmlns="http://www.w3.org/2000/svg" >
      <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <mask id="mask">
            <circle cx={cursor.x-(viewWidth-(svgHW.w!==undefined?svgHW.w:0))} cy={cursor.y-(viewHeight*0.9-(svgHW.h!==undefined?svgHW.h:0))} fill="white" r={"70px"} width="100px" height="100px" filter="url(#mask-blur)" />
          </mask>
      </defs>  

      
    <SliderPair sliderData={props.sliderData} counter={props.counter}/>
    </svg>
    </div>
  )
}



export default NewSlider