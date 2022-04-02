import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

function Page1(props) {

  const q = gsap.utils.selector(props.appref);

  useEffect(()=>{
    gsap.fromTo(q(".page"),{
      opacity:0,
      y:50
    },{
        opacity:1,
        y:0
    });
  },[])

  return (
    <Wrapper className="page" >
        <p>Page1</p>
    </Wrapper>
  )
}

export default Page1

const Wrapper = styled.div`
width:100vw;
height:95vh;
display:flex;
margin:0 auto;
justify-content:center;
align-items:center;
background-color:#213569;
opacity:0;
p{
    width:100px;
    heigh:100px;
    text-align:center;
    font-size:30px;
    color:white;
    font-weight:900;
}
`