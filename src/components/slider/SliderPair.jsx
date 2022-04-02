import React, { useEffect, useState,useContext } from 'react'
import styles from "./SliderPair.module.scss"
import myContext from '../../Context'

function SliderPair(props) {

    const {server, cursor, updateCursor}=useContext(myContext);
    // const server=props.settings.server;
    const sliderData=props.sliderData;
    const [Images , setImages]=useState({noDesign:"",withDesign:""});
    // const [i , setI]=useState(props.number);
    // let i=;


    useEffect(()=>{
        // console.log(sliderData);
       if (sliderData.length>0){
        setImages({
            noDesign:"http://"+server+":1337"+sliderData[props.counter].noDesign.data.attributes.url,
            withDesign:"http://"+server+":1337"+sliderData[props.counter].withDesign.data.attributes.url

        });
       }
        
    },[sliderData.length,props.counter]); 
    // console.log(styles);
    return (
        <g>
            {(sliderData.length>0) &&
            <>
            <image className={styles.slider_pair__image} xlinkHref={Images.noDesign}  x="0" y="0"></image>    
            <image className={styles.slider_pair__image} xlinkHref={Images.withDesign} mask="url(#mask)" x="0" y="0"></image>  
            </>
            }
        </g>
    )
}
export default SliderPair;
