import React, { useState, useRef, useEffect } from "react";
import { useProfile } from "../../context/profileContext";
import styles from "./profileMenu.module.css";
import { handleLogout } from "../../utils/logout";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile, setProfile } = useProfile();
    const menuRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderMenuOptions = () => {
        if (!profile) {
            return (
                <>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                </>
            );
        }

        return profile.venueManager ? (
            <>
                <li>
                    <a href="/create-venue">Create Venue</a>
                </li>
                <li>
                    <a href="/my-profile">My Profile</a>
                </li>
                <li>
                    <button onClick={() => handleLogout(setProfile)}>
                        Logout
                    </button>
                </li>
            </>
        ) : (
            <>
                <li>
                    <a href="/my-profile">My Profile</a>
                </li>
                <li>
                    <button onClick={() => handleLogout(setProfile)}>
                        Logout
                    </button>
                </li>
            </>
        );
    };

    return (
        <div className={styles.profileMenuContainer} ref={menuRef}>
            {/* User icon toggles dropdown */}
            <i
                className={`${styles.userIcon} fa fa-user-circle ${
                    profile ? styles.loggedIn : styles.loggedOut
                }`}
                onClick={toggleDropdown}
            ></i>

            {/* Render dropdown only if isOpen is true */}
            {isOpen && (
                <ul className={styles.dropdown}>{renderMenuOptions()}</ul>
            )}
        </div>
    );
};

export default ProfileMenu;
