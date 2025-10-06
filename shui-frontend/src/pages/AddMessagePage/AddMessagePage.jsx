import './addMessagePage.css';
import AddMessage from '../../components/AddMessage/AddMessage';
import Navigation from '../../components/Navigation/Navigation';
import BackButton from '../../components/BackButton/BackButton';
import Logo from '../../components/Logo/Logo';

const MessagesPage = () => {
  return (
    <section className="add-message-page page">
      <header>
        <section className="nav-section">
          < BackButton />        
          < Navigation />
        </section>        
        <h1 className="messages-page__title title">CREATE MESSAGE</h1>
      </header>
      < AddMessage />
    </section>
  )
}

export default MessagesPage;