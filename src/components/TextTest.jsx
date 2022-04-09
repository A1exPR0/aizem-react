import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import styles from "./TextTest.module.scss"


  function TextTest(props) {

    const [isRevealed,setIsRevealed]=useState(false);
    
    const textArr=["Web Design", "Strategy","Design Sprint","Branding","Packaging"];
    
    const settings = {
        staggerOut: 0.06,
        durationOut: 0.4,
        staggerIn: 0.1,
        durationIn: 1,
        y: 40,
        rotate: 100,
        trOrIn: "",
        trOrOut: "",
        ease: "back.out", // "power2.out" "slow" - need to register

        interval:5000, // in ms
        staggerReveal:0.3,
        durationReveal:0.7,
        xReveal:-50
        // ease: "power2.out",
    }


    const divRef=useRef();

    const appendWrappedText=(str,init=false)=>{
      let arr=str.split("");
      arr=arr.map(el=>el==" "?"&nbsp;":el)
      arr=arr.map(el=>{
        let div=document.createElement('div');
        div.style.display="inline-block";
        if(!init)
           div.style.opacity=0;
        div.className=styles.letter;
        div.innerHTML=el;
        return div;
      })
      arr.forEach(el => {
        divRef.current.append(el);
      });
      // console.log(divRef);

    }

    const removeWrappedText=()=>{
      // console.log(divRef.current.children.length); 
      for(let i=0;i<divRef.current.children.length;)
      {
        // console.log(i,divRef.current.children[i]);
        divRef.current.children[i].remove();
      }
     
    }


    const rotateText=()=>{
      let letters=divRef.current.children;
  

      //rotate old
      gsap.fromTo(letters,{
        rotateX:0,
        y:0,
        opacity:1
      },{
        rotateX:-settings.rotate,
        transformOrigin:settings.trOrOut,
        y:settings.y,
        opacity:0,
        stagger:settings.staggerOut,
        duration:settings.durationOut,
        ease:settings.ease,
        onComplete:()=>{
            //remove old
            removeWrappedText();

            //append new
            appendWrappedText(textArr[0]);

            //rotate new
            gsap.fromTo(letters,{
              rotateX:settings.rotate,
              opacity:0,
              y:-settings.y
            },{
              transformOrigin:settings.trOrIn,
              rotateX:0,
              y:0,
              duration:settings.durationIn,
              opacity:1,
              stagger:settings.staggerIn,
              ease:settings.ease,

            });

        }
      })
      
   textArr.push(textArr.shift());
    }


const reveal=()=>{
const q=gsap.utils.selector(props.appref);
  console.log(q("."+styles.header2));
  console.log(q("."+styles.container+">h3"));
  gsap.fromTo([q("."+styles.header2),q("."+styles.container+">h3")],{
    opacity:0,
    x:settings.xReveal
  },{
    opacity:1,
    x:0,
    stagger:settings.staggerReveal,
    duration:settings.durationReveal
  })
  setIsRevealed(true);
}

    useEffect(()=>{
      let timerId;
      console.log("isRevealde: "+isRevealed);
      if(!isRevealed){
        removeWrappedText();
        appendWrappedText(textArr[textArr.length-1],true);
        reveal();   
      }
      timerId=setInterval(()=>{
        console.log("Interval step");
        // console.log(styles);
        rotateText();

      },settings.interval);
      return(()=>{
        clearInterval(timerId);
        // setIsRevealed(false);
      })
    },[isRevealed])


    return (
      <div className={styles.container}>
        <div className={styles.name}>
          <h1 className={styles.header1}>AIZEM</h1>
          <h3 className={styles.header3}>Агенство визуальной коммуникации</h3>
        </div>
        <h3 style={{opacity:0}} className={styles.header3}>Мы делаем</h3>
          <div style={{opacity:0}} ref={divRef} className={styles.header2}>
          <h2 className={styles.letter}>Branding</h2>
        </div>
      </div>
    )
  }
  
  export default TextTest