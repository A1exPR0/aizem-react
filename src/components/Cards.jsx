import React, { useEffect, useState } from 'react'
import Card from './Card';
import styled from "styled-components"

function Cards() {
    const [works, setWorks]=useState([]);

    useEffect(()=>{
        getWorks();
    },[]);

const getWorks = async()=>{
   const api=await fetch('http://localhost:1337/api/works?populate=thumbnail') 
   const data=await api.json();
   //console.log(works);
   setWorks(data.data);
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

    
`;

export default Cards