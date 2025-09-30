import './loginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <section className="login-page">
      <p>login page</p>
    </section>
  )
}

export default LoginPage;