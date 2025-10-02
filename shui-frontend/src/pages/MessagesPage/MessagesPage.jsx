import './messagesPage.css';
import { useNavigate } from 'react-router-dom';
import MessagesList from '../../components/MessagesList/MessagesList';

const MessagesPage = () => {
  const navigate = useNavigate();
  return (
    <section className="messages-page">
      <h1 className="messages-page__title">MESSAGES</h1>
      < MessagesList />
    </section>
  )
}

export default MessagesPage;