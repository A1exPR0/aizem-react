import React, { useEffect, useState } from 'react'
import Card from './Card';
import styled from "styled-components"
import gsap from 'gsap';
import cardStyles from "./Card.module.scss"


function Cards(props) {
    const [works, setWorks]=useState([]);

    const q2 = gsap.utils.selector(props.appref);

    useEffect(()=>{
        getWorks();
       

    },[]); 

    useEffect(()=>{
      if(works.length){
        console.log("animation");
        gsap.fromTo(q2("."+cardStyles.card),{
            opacity:0,
            y:50
          },{
              opacity:1,
              y:0,
              stagger:0.3,
              duration:0.8
          });
      }
  },[works]); 
    

const getWorks = async()=>{

    const ls=localStorage.getItem('WorksData');
    if(ls){
      setWorks(JSON.parse(ls));
        console.log("Data for works set from Local storage");

    }
    else {
   const api=await fetch('http://localhost:1337/api/works?populate=thumbnail');
   const data=await api.json();
   localStorage.setItem('WorksData',JSON.stringify(data.data));
   console.log("Data for slider set from api call"); 
//    console.log("");
   setWorks(data.data);
}
}

  return (
    <Wrapper >
    {works.map((work)=>{
        return(
          
            <Card key={work.id} name={work.attributes.title} color={work.attributes.color} src={"http://localhost:1337"+work.attributes.thumbnail.data.attributes.url}/>     
           
        );
    })}
    </Wrapper>

  )
}

const Wrapper = styled.div`
    //background-color:red;
    display:flex;
    justify-content:center;
    align-content:center;
    margin:auto;
    flex-direction:column;
    width:80%;
    position:relative;
    .card{
      opacity:0;
    }

    
`;

export default Cards