import React from "react";
import styles from "../register.module.css";

const RegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.heading1}>Welcome!</h1>
      <h2 className={styles.heading2}>Create an account</h2>

      {/* Name Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      {/* Email Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
          title="Only @(stud)noroff.no domains are allowed."
          className={styles.input}
        />
      </div>

      {/* Password Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
          className={styles.input}
        />
      </div>

      {/* Confirm Password Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      {/* Venue Manager Checkbox */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            id="venueManager"
            name="venueManager"
            checked={formData.venueManager}
            onChange={(e) =>
              handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked,
                },
              })
            }
            className={styles.checkbox}
          />
          I want to register as a venue manager
        </label>
      </div>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Submit Button */}
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>

      {/* Link to Login */}
      <p className={styles.link}>
        Already have an account?{" "}
        <a href="/login" className={styles.linkText}>
          Log in here
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
