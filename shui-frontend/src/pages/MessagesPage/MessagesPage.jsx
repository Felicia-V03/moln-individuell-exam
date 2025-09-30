import './messagesPage.css';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
  const navigate = useNavigate();
  return (
    <section className="messages-page">
      <p>messages page</p>
    </section>
  )
}

export default MessagesPage;