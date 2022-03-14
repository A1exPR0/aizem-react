import React, { useEffect, useState } from 'react'
import Card from './Card';
import Coord from './Coord';
import styled from "styled-components"

function Cards() {
    const [works, setWorks]=useState([]);

    useEffect(()=>{
        getWorks();
    },[]);

    // const [coord, setCoord]=useState([]);
//   function updateCoord(e) { 
//       console.log(e);   
//     setCoord([e[0],e[1]]);  
//   }
const getWorks = async()=>{
   const api=await fetch('http://localhost:1337/api/works?populate=thumbnail') 
   const data=await api.json();
   console.log(works);
   setWorks(data.data);
}

// const data={
//     "cards":[{
//         "id":0,
//         "name":"First name",
//         "color":"#BB5500"
//     },{
//         "id":1,
//         "name":"Second name",
//         "color":"#55BB00"
//     },{
//         "id":2,
//         "name":"Third name",
//         "color":"#5500BB"
//     }]
// };

  return (
    <Wrapper >
        <Coord/>
     {/* <p>{coord[0]} and {coord[1]}</p>     */}
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