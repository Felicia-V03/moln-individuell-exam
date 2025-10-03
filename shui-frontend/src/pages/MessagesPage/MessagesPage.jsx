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
    <section className="messages-page">
      <header>
        < Navigation />
        <h1 className="messages-page__title">MESSAGES</h1>
      </header>

      < DateFilter date={date} setDate={setDate} />
      < MessagesList date={date}/>
    </section>
  )
}

export default MessagesPage;