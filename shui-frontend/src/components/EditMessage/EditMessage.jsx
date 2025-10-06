import "./editMessage.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMessageById, updateMessage, deleteMessage } from "../../api/messages";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAuthToken } from "../../hooks/useAuthToken"; 

const EditMessage = ({ id }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const token = user?.token;

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const loadMessage = async () => {
      const msg = await fetchMessageById(id);
      console.log("Fetched message:", msg);

      if (msg) {
        setMessage(msg);
        setNewText(msg.attributes?.message || "");
      } else {
        console.error("Meddelandet hittades inte!");
      }

      setLoading(false);
    };

    loadMessage();
  }, [id]);


  const handleUpdate = async () => {
    await updateMessage(id, { message: newText }, token);
    navigate("/messages");
  };

  const handleDelete = async () => {
    await deleteMessage(id, token);
    navigate("/messages");
  };

  if (loading) return <h2>Laddar meddelande...</h2>;
  if (!message) return <h2>Inget meddelande hittades.</h2>;

  return (
    <section className="edit-message">
      <textarea
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        className="edit__input"
      />
      <section className="edit-button">
        <button onClick={handleUpdate} className="button-full__yellow">UPDATE</button>
        <button onClick={handleDelete} className="button-full__yellow">DELETE</button>
      </section>
    </section>
  );
};

export default EditMessage;