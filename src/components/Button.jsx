import React from 'react'
import styles from "./Button.module.scss"

function Button(props) {
    let style="";

    switch (props.styling) {
        case "orange":
            style=styles.orange;
            break;

        case "white":
            style=styles.white;
            break;
    
        default:
            style=styles.a;
            break;
    }
    
    let isSubmit=false;

    switch(props.type){
        case "submit":
            isSubmit=true;
            break;
        default:
            isSubmit=false;
    }

  return (
    <div className={styles.wrapper}>
        {isSubmit &&
            <button className={style} type='submit'>{props.children}</button>
        }
        {!isSubmit &&
            <a href={props.href} className={style} onClick={props.callback}>{props.children} </a>
        }
        <span className={styles.boxunder}>{props.children}</span>
    </div>

  )
}

export default Button 