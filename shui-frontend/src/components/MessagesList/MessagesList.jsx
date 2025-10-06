import './messagesList.css';
import { fetchMessage } from '../../api/messages';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const MessagesList = ({ username, date }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuthStore(state => state.user);
  const navigate = useNavigate();

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

      filtered.sort((a, b) => 
        new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      );

      setMessages(filtered);
      setLoading(false);
    };

    getMessages();
  }, [username, date]);

  if (loading) return <h2>Laddar meddelanden...</h2>;
  if (!messages.length) return <h2>Inga meddelanden hittades.</h2>;

  return (
    <ul className="messages-list">
      {messages.map((msg, idx) => {
        const msgUser = msg.PK.replace('USER#', '');
        const isOwnMessage = currentUser && currentUser.username === msgUser;

        console.log("Message owner:", msgUser, "Current user:", currentUser?.username, "isOwnMessage:", isOwnMessage);

        return (
          <li className='messages-list__item' key={msg.SK || idx}>
            <section className='messages-list__head'>
              <p>{msg.attributes.createdAt}</p>
              {isOwnMessage && (
                <i
                  className="fa-solid fa-pencil edit-icon"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={() => navigate(`/edit/${msg.SK.replace("MESSAGE#", "")}`)}
                ></i>
              )}
            </section>
            <p>{msg.attributes.message}</p>
            <span>
              <Link to={`/user/${msg.PK.replace("USER#", "")}`} className='user-link'>
                <p>By {msg.PK.replace("USER#", "")}</p>
              </Link>
            </span>            
          </li>
        );
      })}
    </ul>
  );
};


export default MessagesList;