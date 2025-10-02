import './messagesPage.css';
import MessagesList from '../../components/MessagesList/MessagesList';
import Navigation from '../../components/Navigation/Navigation';

const MessagesPage = () => {
  return (
    <section className="messages-page">
      <header>
        < Navigation />
        <h1 className="messages-page__title">MESSAGES</h1>
      </header>
      < MessagesList />
    </section>
  )
}

export default MessagesPage;