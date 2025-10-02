import './addMessagePage.css';
import AddMessage from '../../components/AddMessage/AddMessage';
import Navigation from '../../components/Navigation/Navigation';

const MessagesPage = () => {
  return (
    <section className="message-page">
      <header>
        < Navigation />
        <h1 className="messages-page__title">CREATE MESSAGE</h1>
      </header>
      < AddMessage />
    </section>
  )
}

export default MessagesPage;