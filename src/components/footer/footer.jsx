import React from "react";
import styles from "./footer.module.css";
import sharedStyles from "../../pages/styles.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={sharedStyles.wrapper}>
                <div className={styles.footerWhole}>
                    <div className={styles.footerNav}>
                        <section className={styles.section}>
                            <p>Holidaze</p>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                            <a href="#">Venues</a>
                        </section>
                        <section className={styles.section}>
                            <p>Follow us</p>
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">Instagram</a>
                            <a href="#">Pinterest</a>
                        </section>
                        <section className={styles.section}>
                            <p>More</p>
                            <a href="#">Help</a>
                            <a href="#">Terms of use</a>
                            <a href="#">User support</a>
                            <a href="#">Cookies</a>
                        </section>
                    </div>
                    <div className={styles.copyright}>
                        <div className={styles.line}></div>
                        <p>© Holidaze</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
