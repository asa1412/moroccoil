import React from 'react';
import Head from 'next/head';
import styles from '../styles/About.module.css';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  // Read the sectionabout content
  const sectionFilePath = path.join(process.cwd(), 'src', 'assets', 'data', 'aboutpage.txt');
  const sectionContent = fs.readFileSync(sectionFilePath, 'utf8');

  // Read the head content
  const headFilePath = path.join(process.cwd(), 'src', 'assets', 'data', 'abouthead.json');
  const headContent = fs.readFileSync(headFilePath, 'utf8');
  const headData = JSON.parse(headContent);

  return {
    props: {
      head: headData,
      sectionContent,
    },
  };
}

const About = ({ head, sectionContent }) => (
  <div className={styles.container}>
    <Head>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      <meta name="keywords" content={head.keywords} />
    </Head>    
    <div dangerouslySetInnerHTML={{ __html: sectionContent }}></div>
    <section className={styles.twoColumnSection}>
      <div className={styles.columnLeft}>
        <h2>על דניס רום</h2>
        <p>דניס רום ייסד את חברת AID-AIR בישראל בשנת 2018. החברה מתמחה בהנפקת ויזות לציבור הישראלי למדינות שונות כמו ארה\"ב, קנדה, הודו, דרום קוריאה, מרוקו, אוסטרליה ועוד.</p>
        <p>הרצון של דניס לאפשר לאנשים ליהנות מחופשה או מנסיעת עסקים נתן לו את הרצון לפטור מטיילים מכל העניינים הביורוקרטיים בהגשת ויזות.</p>
        <p>בנוסף, אדם רום, בעל תואר ראשון במשפטים, עובד שנים רבות עם משרדי נסיעות וסוכני נסיעות מובילים בישראל, הכל על מנת לספק את חבילת המידע והשירותים הכוללת למטיילים.</p>
        <p>דניס שואף לתת מענה לכל צרכי המטיילים ולעזור להם לחוות את מרוקו בצורה המהנה והבלתי נשכחת ביותר. הוא משלב ניסיון מקצועי עם אהבה לטיולים, והידע העמוק שלו על תהליך הוצאת הויזות עוזר ללקוחותיו ליהנות מנסיעה חלקה ונטולת דאגות.</p>
      </div>
      <div className={styles.columnRight}>
        <img src="/staticImages/author.webp" alt="Dennis Rom" className={styles.image} />
        <h3>אתרים שותפים</h3>
        <ul>
          <li><a href="https://example1.com" target="_blank" rel="noopener noreferrer">Example Partner 1</a></li>
          <li><a href="https://example2.com" target="_blank" rel="noopener noreferrer">Example Partner 2</a></li>
          <li><a href="https://example3.com" target="_blank" rel="noopener noreferrer">Example Partner 3</a></li>
          <li><a href="https://example4.com" target="_blank" rel="noopener noreferrer">Example Partner 4</a></li>
        </ul>
      </div>
    </section>
  </div>
);

export default About;
