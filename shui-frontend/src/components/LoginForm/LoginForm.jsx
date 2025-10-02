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

  const [error, setError] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    setError(null);

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!username || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const result = await loginApi({ username, password});
      if (result.status === 200) {
        // Spara token i auth hook
        setToken(result.data.token);
        // Uppdatera i auth store
        login(result.data.user);
        //Fortsätt till messages sidan
        navigate('/messages')
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.log(error);
    };
  }

  return (
    <form className="form">
      <h1 className="form__title">Sign In</h1>
      <label className="form__label">
        Username:
        <input type="text" className="form__input" ref={ usernameRef } required/>
      </label>
      <label className="form__label">
        Password:
        <input type="password" className="form__input" ref={ passwordRef } required/>
      </label>

      <button className="form__button" onClick={ loginUser }>Sign In</button>
      <p className="form__text">Don't have an account? <span onClick={ () => toggleForm('REGISTER') } className="form__link">Sign Up</span></p>
    
    </form>
  );
}

export default LoginForm;