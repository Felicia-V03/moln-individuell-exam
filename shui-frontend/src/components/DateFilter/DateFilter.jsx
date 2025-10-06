import './dateFilter.css';

const DateFilter =({ date, setDate }) => {
  const clearDate = () => setDate("");

  return (
    <section className="date-container">
      <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="date-filter"
      />
      {date && (
        <button onClick={clearDate} className="date-reset__button">
          X
        </button>
      )}
    </section>
  );
}

export default DateFilter;