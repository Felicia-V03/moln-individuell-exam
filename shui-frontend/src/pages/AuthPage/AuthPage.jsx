import './authPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useLocation } from 'react-router-dom';
import { useState } from 'react'; 

const AuthPage = () => {
  const location = useLocation();
  const [ activeForm, setActiveForm ] = useState(
    location.state?.form || 'LOGIN'
  );

  const toggleForm = (form) => {
    setActiveForm(form);
  }
  
  return (
    <section className="auth-page page">
      {activeForm === 'LOGIN' ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegisterForm toggleForm={toggleForm} />
      )}
    </section>
  );
};

export default AuthPage;