import './messagesPage.css';
import MessagesList from '../../components/MessagesList/MessagesList';
import Navigation from '../../components/Navigation/Navigation';
import DateFilter from '../../components/DateFilter/DateFilter';
import { useState } from "react";

const MessagesPage = () => {
  const [date, setDate] = useState("");

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