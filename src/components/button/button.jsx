import React from "react";
import styles from "./button.module.css";

const Button = ({
    onClick,
    children,
    className = "",
    disabled = false,
    type = "button",
}) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
