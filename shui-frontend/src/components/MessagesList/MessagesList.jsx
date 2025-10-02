import './messagesList.css';
import { fetchMessage } from '../../api/messages';
import { useEffect, useState } from 'react';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const message = await fetchMessage();
        setMessages(message || []);
      } catch (err) {
        console.log('Kunde inte hämta meddelanden:', err);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  if (loading) return <h2>Laddar meddelanden...</h2>;
  if (!messages.length) return <h2>Inga meddelanden hittades.</h2>;

  return (
    <ul className="messages-list">
      {messages.map((msg, idx) => (
        <ol className='messages-list__item' key={msg.SK || idx}>
          <p>{msg.attributes.message}</p>
          <span>{msg.PK.replace('USER#', '')}</span>
          <p>{msg.attributes.createdAt}</p>
        </ol>
      ))}
    </ul>
  );
}

export default MessagesList;