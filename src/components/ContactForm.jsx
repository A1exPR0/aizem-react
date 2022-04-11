import React, { useRef } from 'react'
import styles from './ContactForm.module.scss'


function ContactForm() {

  const formRef=useRef();

  const handlerSubmit=(e)=>{
    let name=formRef.current.name.value;
    let email=formRef.current.email.value;
    let phone=formRef.current.phone.value;
    let about=formRef.current.about.value;
    let date=new Date();
    date.toUTCString();

    // console.log(date);


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data:{
        form: 'Contact us',
        page:'main-page',
        name:name,
        email:email,
        send:date,
        phone:phone,
        about:about
       }})
  };
  fetch('http://localhost:1337/api/form-submissions', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
        <svg viewBox="0 0 1440 1014"  xmlns="http://www.w3.org/2000/svg">
        <path d="M1246.5 67.8701C1389 131.87 1500.5 134.371 1759.5 114.371V1013.87H-155L-176.5 131.871C124.5 -126.629 463 79.8712 753.5 50.3712C1044 20.8712 1104 3.87035 1246.5 67.8701Z" fill="#007C97"/>
        </svg>
            <form onSubmit={handlerSubmit} ref={formRef}> 
                <input type="text" name='name' placeholder="Your Name"></input>
                <input type="email" name='email' placeholder="Your Email"></input>
                <input type="text" name='phone' placeholder="Your Phone"></input>
                <textarea name="about" id="" cols="30" rows="4" placeholder='About Project'></textarea>
                <input type="submit" value="Отправить" />
            </form>
    </div>
  )
}

export default ContactForm