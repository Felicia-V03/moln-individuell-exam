import "./userMessagesPage.css";
import MessagesList from '../../components/MessagesList/MessagesList';
import Navigation from '../../components/Navigation/Navigation';
import BackButton from '../../components/BackButton/BackButton';
import { useParams } from 'react-router-dom';

const UserMessagesPage = () => {
  const { username } = useParams();

  return (
    <section className="messages-page">
      <header>
        < BackButton />
        <h1 className="messages-page__title">MESSAGES FROM { username }</h1>
        < Navigation />
      </header>

      < MessagesList username={ username }/>
    </section>
  )
}

export default UserMessagesPage;