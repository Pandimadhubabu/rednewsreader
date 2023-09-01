'use client'

import { motion } from 'framer-motion'

import styles from '../../styles/Home.module.css'

export default function Loading() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{
                type: "spring",
                stiffness: 140,
                damping: 20
            }}
        >
            <div className={styles.footer}>Loading..</div>
        </motion.div>
    )
}
