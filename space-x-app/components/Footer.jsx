import React from "react";
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <Image src="https://sdtimes.com/wp-content/uploads/2020/04/1_oBm_3saYz4AI_MS6OekdFQ.png" alt="Vercel Logo" width={200} height={75}/>
            </span>
          </a>
    </footer>
  )
}

export default Footer;