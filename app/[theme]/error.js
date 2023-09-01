'use client'

import { useEffect } from 'react'
import styles from '../../styles/Home.module.css'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.log('logging error:', error);
    }, [error])

    return (
        <>
            <div className={styles.footer}>Error...</div>
            <div className={styles.footer} onClick={() => reset()}>Refresh</div>
        </>
    )
}
