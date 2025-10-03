import './dateFilter.css';

const DateFilter =({ date, setDate }) => {
  const clearDate = () => setDate("");

  return (
    <div className="date-container">
      <label>
        Filtrera på datum:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="date-filter"
        />
      </label>
      {date && (
        <button onClick={clearDate} className="date-reset__button">
          Rensa
        </button>
      )}
    </div>
  );
}

export default DateFilter;