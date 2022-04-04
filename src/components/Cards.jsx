import React, { useEffect, useState } from 'react'
import Card from './Card';
import styled from "styled-components"
import gsap from 'gsap';
import cardStyles from "./Card.module.scss"

const settings={
  revealY:50,
  revealStagger:0.3,
  revealDuration:0.8,
  fetchStr:'http://localhost:1337/api/works?populate=thumbnail',
}

function Cards(props) {
    const [works, setWorks]=useState([]);

    const q2 = gsap.utils.selector(props.appref);

    useEffect(()=>{
        getWorks();
       
    },[]); 

    useEffect(()=>{
      if(works.length){

        gsap.fromTo(q2("."+cardStyles.card),{
            opacity:0,
            y:settings.revealY
          },{
              opacity:1,
              y:0,
              stagger:settings.revealStagger,
              duration:settings.revealDuration
          });
      }
  },[works]); 
    

const getWorks = async()=>{

    const ls=localStorage.getItem('WorksData');
    if(ls){
      setWorks(JSON.parse(ls));
        // console.log("Data for works set from Local storage");
      } 
    else {
      const api=await fetch(settings.fetchStr);
      const data=await api.json();
      localStorage.setItem('WorksData',JSON.stringify(data.data));
      //  console.log("Data for slider set from api call"); 
    //    console.log("");
      setWorks(data.data);
    }
}

  return (
    <Wrapper >
    {works.map((work)=>{
        return(
          
            <Card key={work.id} name={work.attributes.title} color={work.attributes.color} src={"http://localhost:1337"+work.attributes.thumbnail.data.attributes.formats.medium.url}/>     
           
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