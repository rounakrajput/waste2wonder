import React from "react";
import styles from "@/styles/Footer.module.css"

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footer_columns}>
            <div className={styles.column}>
              <h3>Our Team</h3>
              <ul>
                <li>Rounak Kumar</li>
                <li>Swati Suman</li>
                <li>Niranjan Kumar</li>
                <li>Emily Johnson</li>
                <li>David Brown</li>
              </ul>
            </div>
            <div className={styles.column}>
              <h3>Copyright</h3>
              <p>&copy; A major Project by 6th sem - 2024</p>
            </div>
            <div className={styles.column}>
              <h3>Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.9904706952475!2d85.08551251544314!3d25.594094383722903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e334c6aa1b6d9%3A0xb084123f2d023dd!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1649720160935!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
