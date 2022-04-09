import React, { useRef, useState } from 'react'
import styles from './ServicesToggler.module.scss'
import Badge from './Badge'
import gsap from 'gsap'

const servicesData=[
  {title:"Branding", content:"some content goes here", img:"http://localhost:1337/uploads/medium_3_banera_b3644b19c2.png",badges:["beenamel","overquel"]},
  {title:"Web Design", content:"Another content to write here", img:"http://localhost:1337/uploads/medium_oblozhka_youtube_0d566cc7b3.png",badges:["СОЮЗ","MSS"]},
  {title:"Design Sprint", content:"Another content to write here", img:"http://localhost:1337/uploads/medium_oblozhka_youtube_0d566cc7b3.png",badges:["СОЮЗ","MSS"]},
  {title:"Strategy", content:"Another content to write here", img:"http://localhost:1337/uploads/medium_oblozhka_youtube_0d566cc7b3.png",badges:["СОЮЗ","MSS"]},
  {title:"Graphic Design", content:"Another content to write here", img:"http://localhost:1337/uploads/medium_oblozhka_youtube_0d566cc7b3.png",badges:["СОЮЗ","MSS"]},
]

function SevicesToggler() {
  const contRef=useRef();
  const q=gsap.utils.selector(contRef);

  const [current,setCurrent]=useState(0);

  const changeCurrent = (i)=>{
    //remove old

    gsap.to(q("."+styles.serviceCard),{
      x:50,
      opacity:0,
      onComplete:()=>{
        console.log(i);
        //update current
        setCurrent(i);
        //reveal new
        gsap.fromTo(q("."+styles.serviceCard),{
          x:50,
          opacity:0
        },{
          x:0,
          opacity:1
        })
      }
    })
    

  }

  return (
    <div className={styles.wrapper}>
        <div className={styles.buttons}>
          {servicesData.map((el,index)=>{
            return <a key={index}  onClick={(e)=>changeCurrent(index)} className={index==current?styles.buttonActive:styles.button}>{el.title}</a>
          })}
        </div>
        <div className={styles.cardContainer} ref={contRef}>
            <div className={styles.serviceCard}> 
                <div className={styles.serviceInfo}>
                  <h3>{servicesData[current].title}</h3>
                  <div className={styles.content}>{servicesData[current].content}</div>
                  <div className={styles.badges}>
                    {servicesData[current].badges.map((el)=>{
                      return <Badge key={el} styling="green-solid">{el}</Badge>
                    })}
                  
                  </div>
                </div>
                <img src={servicesData[current].img} alt="" />
                
            </div>
        </div>
    </div>
  )
}

export default SevicesToggler