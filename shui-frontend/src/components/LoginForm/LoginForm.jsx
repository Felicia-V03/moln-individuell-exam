import './LoginForm.css';
import { loginApi } from '../../api/auth';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { useAuthToken } from '../../hooks/useAuthToken';

const LoginForm = ({ toggleForm }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {setToken} = useAuthToken();

  const loginUser = async (e) => {
    e.preventDefault();

    const result = await loginApi({
      username : usernameRef.current.value,
      password : passwordRef.current.value
    });
    console.log(result.data);
    login({
      username : usernameRef.current.value,
      token : result.data.token
    });
    setToken(result.data.token);
    navigate("/messages");
  }

  return (
    <form className="form">
      <h1 className="form__title title">Sign In</h1>
      <label className="form__label">
        Username
      </label>
      <input type="text" className="form__input" ref={ usernameRef } required/>
      <label className="form__label">
        Password
      </label>
        <input type="password" className="form__input" ref={ passwordRef } required/>

      <button className="form__button" onClick={ loginUser } >Sign In</button>
      <p className="form__text">Don't have an account? <span onClick={ () => toggleForm('REGISTER') } className="form__link">Sign Up</span></p>
    
    </form>
  );
}

export default LoginForm;