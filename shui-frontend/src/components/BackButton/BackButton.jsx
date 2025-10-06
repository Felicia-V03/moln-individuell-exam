import './backButton.css';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <i className="fa-solid fa-arrow-left back-button" onClick={() => navigate(-1)}></i>
  );
};

export default BackButton;