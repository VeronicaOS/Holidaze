import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "../profileMenu/profileMenu";
import styles from "./header.module.css";
import logoImage from "../../assets/images/logo/holidazeLogo.png";
import sharedStyles from "../../pages/styles.module.css";

const Header = () => {
    return (
        <div className={sharedStyles.wrapper}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <img
                        src={logoImage}
                        alt="Holidaze logo"
                        className={styles.logoImage}
                    />
                </Link>
                <div className={styles.headerNav}>
                    <Link to="/venues" className={styles.link}>
                        Venues
                    </Link>
                    {/* Add DropdownMenu here */}
                    <ProfileMenu />
                </div>
            </header>
        </div>
    );
};

export default Header;
