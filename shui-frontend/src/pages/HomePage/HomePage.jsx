import './homePage.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import bg from '../../assets/bg2.png';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section className="home-page page" style={{backgroundImage: `url(${bg})`}}>
      <h1 className="home-page__title">WELCOME TO SHUI </h1>
      <section className='button-section'>
        <Button className="button-line" text="Sign In" onClick={() => navigate('/auth', { state: { form: 'LOGIN'}})} />
        <Button className="button-full__yellow" text="Sign Up" onClick={() => navigate('/auth', { state: { form: 'REGISTER'}})} />
      </section>
    </section>
  )
}

export default HomePage;