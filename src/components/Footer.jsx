import React from 'react'
import styles from './Footer.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faTelegram} from '@fortawesome/free-brands-svg-icons'
import {faBehance} from '@fortawesome/free-brands-svg-icons'
import {faDribbble} from '@fortawesome/free-brands-svg-icons'

function Footer() {
    // const inst=
  return (
    <div className={styles.container}>
        <div className={styles.col}>
            <div>Телефон <a href='#'>89165520181</a></div>
            <div>E-mail <a href="#">info@aizem.ru</a></div>
        </div>
        <div className={styles.col}>
        {/* <FontAwesomeIcon icon={faInstagram} size="2x" color='#333333'/> */}
        <FontAwesomeIcon icon={faBehance} size="2x" color='#333333'/>
        <FontAwesomeIcon icon={faTelegram} size="2x" color='#333333'/>
        <FontAwesomeIcon icon={faDribbble} size="2x" color='#333333'/>
        </div>

    </div>
  )
}

export default Footer