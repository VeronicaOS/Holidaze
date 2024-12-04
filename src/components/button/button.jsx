import React from "react";
import styles from "./button.module.css"; // Import the CSS file for button styles

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
            className={`${styles.button} ${className}`} // Combine default and custom styles
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
