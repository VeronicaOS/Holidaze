import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
    const location = useLocation();

    // Pages that shouldn't display the header and footer
    const noHeaderFooterRoutes = ["/login", "/register"];

    const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

    return (
        <div className={styles.layout}>
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

export default Layout;
