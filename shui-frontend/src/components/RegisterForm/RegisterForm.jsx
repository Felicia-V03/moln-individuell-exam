import './registerForm.css';
import { registerApi } from '../../api/auth';
import { useRef, useState } from 'react';

const RegisterForm = ({ toggleForm }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();

  const [error, setError] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    setError(null);

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const passwordRepeat = passwordRepeatRef.current.value;

    if (password !== passwordRepeat) {
      setError("Password don't match");
      return;
    }
  
    try {
      const result = await registerApi({ username, password, email });
      if (result.status === 201) {
        toggleForm('LOGIN');
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.log(error);
    }
  }

  return (
    <form className="form">
      <h1 className="form__title title">CREATE ACCOUNT</h1>
      <label className="form__label">
        Username
      </label>
      <section className="form-input__wrapper">
        <i className="fa-regular fa-user form-icon"></i>
        <input type="text" className="form__input" ref={ usernameRef } required/>
      </section>      
      <label className="form__label">
        Email
      </label>
      <section className="form-input__wrapper">
        <i class="fa-solid fa-envelope form-icon"></i>
        <input type="email" className="form__input" ref={ emailRef } required/>
      </section>
      <label className="form__label">
        Password
      </label>
      <section className="form-input__wrapper">
        <i className="fa-solid fa-unlock form-icon"></i>
        <input type="password" className="form__input" ref={ passwordRef } required/>  
      </section>      <label className="form__label">
        Confirm password
      </label>
      <section className="form-input__wrapper">
        <i className="fa-solid fa-unlock form-icon"></i>
        <input type="password" className="form__input" ref={ passwordRepeatRef } required/>  
      </section>
      <button className="form__button button-full__beigt" onClick={ registerUser }>Sign Up</button>
      <p className="form__text">Already a member? <span onClick={ () => toggleForm('LOGIN') } className="form__link">Sign In</span></p>

    </form>
  );
}

export default RegisterForm;