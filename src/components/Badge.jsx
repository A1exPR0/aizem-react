import React from 'react';
import styles from "./Badge.module.scss";

function Badge(props) {
  let styling;
//   console.log(styles);
  
  switch (props.styling) {
    case "orange-outline":
        styling=styles.orangeOutline;
        break;
    case "green-solid":
        styling=styles.greenSolid;
        break;
        
          default:
              styling=styles.orangeOutline;
              break;
            }
            
    // console.log(styling);
    return (
    <div className={styling}>{props.children}</div>
  )
}

export default Badge