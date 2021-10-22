import React from 'react'
import SvgComponent from './LogoSVG';

import styles from './Header.module.css';

const Logo = () => {
    return (
      <div className={styles.logo__wrapper}>
        <SvgComponent
          className={styles.logo}
          fill="var(--secondary-color-yellow)"
        />
        <span className={styles.logo__text}>takeNotes</span>
      </div>
    );
}

export default Logo
