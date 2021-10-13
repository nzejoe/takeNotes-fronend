import React from 'react'
import { Card } from '../UI'
import { AuthUser, Logo } from '../Header'

import styles from './Layout.module.css'

const Header = () => {
    return (
        <Card className={styles.header}>
            <Logo/>
            <AuthUser/>
        </Card>
    )
}

export default Header;
