import styles from './Clients.module.scss'
import React, { useRef } from 'react'
import Client from './Client'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin'

function Clients(props) {
    const clients=[
        {name:"Beenamel",logo:"/images/clients/BnmlLogo.svg",mask:"/images/clientsMask/BnmlLogo_mask.svg"},
        {name:"Zodiac",logo:"/images/clients/ZodiacLogo.svg",mask:"/images/clientsMask/ZodiacLogo_mask.svg"},
        {name:"Lookin Rooms",logo:"/images/clients/LookinLogo.svg",mask:"/images/clientsMask/LookinLogo_mask.svg"},
        {name:"Lawyer Pro",logo:"/images/clients/LawyerLogo.svg",mask:"/images/clientsMask/LawyerLogo_mask.svg"},
        {name:"Beenamel",logo:"/images/clients/BnmlLogo.svg",mask:"/images/clientsMask/BnmlLogo_mask.svg"},
        {name:"Zodiac",logo:"/images/clients/ZodiacLogo.svg",mask:"/images/clientsMask/ZodiacLogo_mask.svg"},
        {name:"Lookin Rooms",logo:"/images/clients/LookinLogo.svg",mask:"/images/clientsMask/LookinLogo_mask.svg"},
        {name:"Lawyer Pro",logo:"/images/clients/LawyerLogo.svg",mask:"/images/clientsMask/LawyerLogo_mask.svg"},
    ]
    
    const nameRef=useRef();
    const q=gsap.utils.selector(nameRef);
    gsap.registerPlugin(TextPlugin);
    const showName=(name)=>{
        // nameRef.current.innerHTML=name;
        gsap.to(nameRef.current,{
            opacity:1,
            y:0,
            text:name
        })
    }
    
    const hideName=()=>{
        // console.log("hide name");
        gsap.to(nameRef.current,{
            opacity:0,
            y:"-100%",
            duration:0.2,
            onComplete:()=>{gsap.set(nameRef.current,{
                y:"100%",
                text:"****",

            })

            }
        })
    }

  return (
    <div>
        <h2 className={styles.header}>{props.children}</h2>
        <h3 className={styles.clientName} ref={nameRef}>client</h3>
        <div className={styles.grid}>
            {clients.map((client,index)=>(
                <Client key={index} leave={()=>hideName()} enter={()=>showName(client.name)} img={client.mask} 
                ></Client>
            ))}
        </div>
    </div>
  )
}

export default Clients