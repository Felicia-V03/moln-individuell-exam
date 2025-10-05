import './messagesPage.css';
import MessagesList from '../../components/MessagesList/MessagesList';
import Navigation from '../../components/Navigation/Navigation';
import DateFilter from '../../components/DateFilter/DateFilter';
import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

const MessagesPage = () => {
  const [date, setDate] = useState("");
  const user = useAuthStore(state => state.user);  
  console.log("User:", user);


  return (
    <section className="messages-page page">
      <header>
        <section className="nav-section">
          < Navigation />
        </section>
        <h1 className="messages-page__title title">MESSAGES</h1>
      </header>

      <section className='messages-page__boby'>
        < DateFilter date={date} setDate={setDate} />
        < MessagesList date={date}/>      
      </section>
    </section>
  )
}

export default MessagesPage;