
import { useContext, useRef } from 'react';
import styles from './NewSlider.module.scss'
import SliderPair from './SliderPair'
import myContext from '../../Context'

function NewSlider(props) {
  const {server,cursor,updateCursor}=useContext(myContext);

  const svgRef=useRef();
  // console.log(svgRef);
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
            <circle cx={cursor.x-viewWidth*0.3} cy={cursor.y} fill="white" r={"70px"} width="100" height="100px" filter="url(#mask-blur)" />
          </mask>
      </defs>  

      
    <SliderPair sliderData={props.sliderData} counter={props.counter}/>
    </svg>
    </div>
  )
}



export default NewSlider