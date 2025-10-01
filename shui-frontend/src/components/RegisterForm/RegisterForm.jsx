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
      console.log(err);
    }
  }

  return (
    <form className="form">
      <h1 className="form__title">Sign Up</h1>
      <label className="form__label">
        Username:
        <input type="text" className="form__input" ref={ usernameRef } required/>
      </label>
      <label className="form__label">
        Email:
        <input type="email" className="form__input" ref={ emailRef } required/>
      </label>
      <label className="form__label">
        Password:
        <input type="password" className="form__input" ref={ passwordRef } required/>
      </label>
      <label className="form__label">
        Confirm password:
        <input type="password" className="form__input" ref={ passwordRepeatRef } required/>
      </label>

      <button className="form__button" onClick={ registerUser }>Sign Up</button>
      <p className="form__text">Already a member? <span onClick={ () => toggleForm('LOGIN') } className="form__link">Sign In</span></p>

    </form>
  );
}

export default RegisterForm;