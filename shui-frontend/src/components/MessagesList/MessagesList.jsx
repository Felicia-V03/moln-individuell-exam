import './messagesList.css';
import { fetchMessage } from '../../api/messages';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MessagesList = ({ username, date }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      const allMessages = await fetchMessage();

      let filtered = username
        ? allMessages.filter(msg => msg.PK === `USER#${username}`)
        : allMessages;

      if (date) {
        filtered = filtered.filter(msg =>
          msg.attributes.createdAt.startsWith(date)
        );
      }

      setMessages(filtered);
      setLoading(false);
    };

    getMessages();
  }, [username, date]);

  if (loading) return <h2>Laddar meddelanden...</h2>;
  if (!messages.length) return <h2>Inga meddelanden hittades.</h2>;

  return (
    <ul className="messages-list">
      {messages.map((msg, idx) => (
        <li className="messages-list__item" key={msg.SK || idx}>
          <p>{msg.attributes.message}</p>
          <span>
            <Link to={`/user/${msg.PK.replace("USER#", "")}`}>
              {msg.PK.replace("USER#", "")}
            </Link>
          </span>
          <p>{msg.attributes.createdAt}</p>
        </li>
      ))}
    </ul>
  );
};


export default MessagesList;