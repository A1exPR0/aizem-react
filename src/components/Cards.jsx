import React from 'react'
import Card from './Card';
import styled from "styled-components"

function Cards() {

const data={
    "cards":[{
        "id":0,
        "name":"First name",
        "color":"#BB5500"
    },{
        "id":1,
        "name":"Second name",
        "color":"#55BB00"
    },{
        "id":2,
        "name":"Third name",
        "color":"#5500BB"
    }]
};

  return (
    <Wrapper >
    {data.cards.map((card)=>{
        return(
          
            <Card key={card.id} name={card.name} color={card.color}/>     
           
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
    
`;

export default Cards