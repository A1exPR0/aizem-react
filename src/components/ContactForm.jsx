import React, { useRef } from 'react'
import styles from './ContactForm.module.scss'
import Button from './Button'
import { Formik, Form, Field} from 'formik';
import gsap from 'gsap';

function ContactForm(props) {



  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Обязательно';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Неверный e-mail адрес';
    }
    return error;
  }
 
  function validateName(value) {
    let error;
    if (!value) {
      error = 'Обязательно';
    } 
    return error;
  }

  const formikHandler = async (val) =>{
    console.log(val);
    let response;
    let date=new Date();
    date.toUTCString();
    try {
      response = await fetch('http://localhost:1337/api/form-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ data:{
        form: 'Contact us',
        page:'main-page',
        name:val.name,
        email:val.email,
        send:date,
        phone:val.phone,
        about:val.about
       }})
    });
    } catch (error) {
      gsap.set("."+styles.succes,{
        text:"Что-то пошло не так. Форма не отправлена (("
      });
      gsap.to("."+styles.succes,{
        opacity:1,
        onComplete:()=>{
          setTimeout(() => {
            gsap.to("."+styles.succes,{
              opacity:0
            })
          }, 4000);
        }
      });
    }
  
    if(response.ok) {
    //on succes
        val.name="";
        val.email="";
        val.phone="";
        val.about="";
        gsap.set("."+styles.succes,{
          text:"Спасибо, ваше письмо отправленно"
        });
        gsap.to("."+styles.succes,{
          opacity:1,
          onComplete:()=>{
            setTimeout(() => {
              gsap.to("."+styles.succes,{
                opacity:0
              })
            }, 4000);
          }
        });
    }
  }

  // const handlerSubmit=(e)=>{
  //   let name=formRef.current.name.value;
  //   let email=formRef.current.email.value;
  //   let phone=formRef.current.phone.value;
  //   let about=formRef.current.about.value;
  //   let date=new Date();
  //   date.toUTCString();

  //   // console.log(date);


  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ data:{
  //       form: 'Contact us',
  //       page:'main-page',
  //       name:name,
  //       email:email,
  //       send:date,
  //       phone:phone,
  //       about:about
  //      }})
  // };
  // fetch('http://localhost:1337/api/form-submissions', requestOptions)
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  //   e.preventDefault();
  // }

  return (
    <div className={styles.container}>
       
        <svg viewBox="0 0 1440 1014"  xmlns="http://www.w3.org/2000/svg">
        <path d="M1246.5 67.8701C1389 131.87 1500.5 134.371 1759.5 114.371V1013.87H-155L-176.5 131.871C124.5 -126.629 463 79.8712 753.5 50.3712C1044 20.8712 1104 3.87035 1246.5 67.8701Z" fill="#007C97"/>
        </svg>
            <Formik
              initialValues={{email:'',name:'',phone:'',}}
              onSubmit={(values)=>formikHandler(values)}
            >
               {({ errors, touched }) => (
              <Form>
              <h3>{props.children}</h3>
                <Field type="text" name="name" placeholder="Ваше Имя или название организации" validate={validateName}/>
                {errors.name && touched.name && <div className={styles.error}>{errors.name}</div>}
                <Field type="email" name="email" placeholder="Email для ответа" validate={validateEmail}/>
                {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}
                <Field type="phone" name="phone" placeholder="Телефон, если вопрос срочный"/>
                <Field as="textarea" type="textarea" name="about" placeholder="Опишите проект"/>
                <div className={styles.succes}>Спасибо, ваше письмо отправленно</div>
                <div style={{alignSelf:"center"}}>
                <Button styling="orange" type='submit'>Отправить</Button>
                </div>
              </Form>
               )}
            </Formik>
            {/* <form onSubmit={handlerSubmit} ref={formRef}> 
            <h3>{props.children}</h3>
                <div className={styles.row}>
                <label htmlFor='name'>Имя / Название организации</label>
                <input type="text" name='name' placeholder="Как Вас зовут"></input></div>
                <label htmlFor='email'>Ваш E-mail</label>
                <input type="email" name='email' placeholder="Ваш E-mail"></input>
                <label htmlFor='phone'>Номер телефона</label>
                <input type="text" name='phone' placeholder="Номер телефона"></input>
                <textarea name="about" id="" cols="30" rows="3" placeholder='Расскажите о своем проекте'></textarea>
                  
                  <Button styling="orange" callback={handlerSubmit} href="#">Отправить</Button>
                  </div>
            </form> */}
    </div>
  )
}

export default ContactForm


