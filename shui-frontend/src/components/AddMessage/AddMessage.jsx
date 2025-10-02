import './addMessage.css';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postMessage } from '../../api/messages';
import { useAuthToken } from '../../hooks/useAuthToken';

const AddMessage = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const messageRef = useRef("");
  const [status, setStatus] = useState("");

  const messageHandle = async (e) => {
    e.preventDefault();
    setStatus("");

    const message = messageRef.current.value.trim();
    if (!message) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      const result = await postMessage({ message }, token);
      if (typeof result === "string") {
        setStatus(result);
      } else {
        setStatus("Message created successfully!");
        messageRef.current.value = "";
        navigate("/messages"); // navigera direkt
      }
    } catch (err) {
      console.error("Error posting message:", err);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="form">
      <h1 className="form__title">CREATE MESSAGE</h1>

      <label className="form__label">
        Message:
        <textarea className="form__input" ref={messageRef} required />
      </label>

      <button type="button" className="form__button" onClick={messageHandle}>
        Create Message
      </button>

      {status && <p className="form__text">{status}</p>}
    </form>
  );
};

export default AddMessage;
