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

  return (
    <div className={styles.wrapper}>
        <a href={props.href} className={style}>{props.children}</a>
        <span className={styles.boxunder}>{props.children}</span>
    </div>

  )
}

export default Button 