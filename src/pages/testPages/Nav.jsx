import gsap from 'gsap';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'


function Nav(props) {

let navigate=useNavigate();

const q = gsap.utils.selector(props.appref);

 const pageChange=(e,dest)=>{
  if(!e.target.classList.contains("active")){
    e.preventDefault();
    gsap.to([q(".page p"),q(".page")],{
        opacity:0,
        y:50,
        stagger:0.5,
        // rotateX:90,
        height:0,
        onComplete:()=>{
            navigate(dest);
            // console.log("complete");
        }
    });
  }
 }
    
  return (
    <Wrapper>
        <NavLink onClick={(e)=>{pageChange(e,"/");}} to="/">PAGE 1</NavLink>
        <NavLink onClick={(e)=>{pageChange(e,"/p2");}} to="/p2">PAGE 2</NavLink>
        <NavLink onClick={(e)=>{pageChange(e,"/p3");}} to="/p3">PAGE 3</NavLink>

    </Wrapper>
  )
}

export default Nav

const Wrapper = styled.div`
width:100vw;
height:5vh;
display:flex;
margin:0 auto;
justify-content:space-around;
align-items:center;
color:black;
`