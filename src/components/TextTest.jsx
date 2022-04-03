import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import styles from "./TextTest.module.scss"


  function TextTest(props) {

 
    const divRef=useRef();
    let textArr=["Web Design", "Strategy","Design Sprint","Branding"];

    const appendWrappedText=(str,init=false)=>{
      let arr=str.split("");
      arr=arr.map(el=>el==" "?"&nbsp;":el)
      // arr=arr.map(el=>"<div>"+el+"</div>");
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
        rotateX:-90,
        y:40,
        opacity:0,
        stagger:0.06,
        duration:0.3,
        onComplete:()=>{
            //remove old
      removeWrappedText();
      //append new
      appendWrappedText(textArr[0]);
      //rotate new
      
      gsap.fromTo(letters,{
        rotateX:90,
        opacity:0,
        y:-40
        // text:textArr[textArr.length-1]
      },{
        rotateX:0,
        y:0,
        duration:1,
        opacity:1,
        stagger:0.1,

        // text:{
        //   value:textArr[0],
        //   // newClass:styles["rotated-text"]
        // },
        // // rotateX:90,
        ease:"power2.out",

      });

        }
      })
      
   textArr.push(textArr.shift());
    }


const inAnimation=()=>{
const q=gsap.utils.selector(props.appref);
  gsap.fromTo([q(".page"),q("."+styles.container+">h2")],{
    opacity:0,
    x:-50
  },{
    opacity:1,
    x:0,
    stagger:0.3
  })
}

    useEffect(()=>{
      removeWrappedText();
      appendWrappedText(textArr[textArr.length-1],true);
    inAnimation();   

     const timerId=setInterval(()=>{
        // console.log("Interval step");
        // console.log(styles);
        rotateText();

      },5000)
      return(()=>{
        clearInterval(timerId);
      })
    })


    return (
      <div className={styles.container}>
        <h2 style={{opacity:0}}>Мы делаем</h2>
        <div style={{opacity:0}} ref={divRef} className='page'>
          <h2 className={styles.letter}>Branding</h2>
        </div>
      </div>
    )
  }
  
  export default TextTest