import React, { useEffect, useRef, useState } from 'react'
import "./PageTransition.scss"
import {CSSTransition} from 'react-transition-group'
import gsap from 'gsap';
import { matchPath, useLocation, useMatch } from 'react-router';


function PageTransition({to,children}) {
    const myref=useRef();
    let location=useLocation();
    // console.log(location);
    
    // const match=useMatch(location.pathname);
    const [inProp,setInProp]=useState("");

    useEffect(()=>{
        setInProp(location.pathname);
    },[location]);

    const onEnter = node =>{
        gsap.fromTo(node.children[0],{
            y:100,
            opacity:0
        },{
            y:0,
            opacity:1,
            duration:0.4
        })
      };
      
      const onExit=node=>{
          console.log("exit");
        gsap.fromTo(node.children[0],{
            y:0,
            opacity:1
        },{
            y:-100,
            opacity:0,
            duration:0.4
        })
      };
  return (
        <CSSTransition
        in={inProp==location.pathname}
        timeout={1200}
        onExit={onExit}
        onEnter={onEnter}
        // classNames='page'
        unmountOnExit>
            <div ref={myref}>
            {children}
            </div>
        </CSSTransition>
  )
}

export default PageTransition