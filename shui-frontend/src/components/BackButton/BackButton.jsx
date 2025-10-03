import './backButton.css';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="back-button">
      <i className="fa-solid fa-arrow-left"></i>
    </button>
  );
};

export default BackButton;