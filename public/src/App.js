import React, { useState, useEffect } from "react";

const getRandomColor = () => {
  const colors = ["#e63946", "#457b9d", "#f4a261", "#2a9d8f", "#8ecae6"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const App = () => {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [bgColor, setBgColor] = useState(getRandomColor());

  const fetchQuote = async () => {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    setQuote(data);
    setBgColor(getRandomColor());
  };

  const toggleFavorite = () => {
    const exists = favorites.find((q) => q._id === quote._id);
    const updated = exists
      ? favorites.filter((q) => q._id !== quote._id)
      : [quote, ...favorites];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: "#fff",
        padding: "2rem",
        fontFamily: "sans-serif",
        transition: "background-color 0.5s ease",
      }}
    >
      <h1>✨ Quotable</h1>
      {quote && (
        <div style={{ margin: "2rem 0" }}>
          <blockquote style={{ fontSize: "1.5rem", fontStyle: "italic" }}>
            “{quote.content}”
          </blockquote>
          <p>— {quote.author}</p>
          <button
            onClick={toggleFavorite}
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              border: "none",
              background: "#00000080",
              color: "#fff",
              borderRadius: "6px",
            }}
          >
            {favorites.find((q) => q._id === quote._id)
              ? "💔 Remove Favorite"
              : "♥️ Add to Favorites"}
          </button>
          <button
            onClick={fetchQuote}
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              border: "none",
              background: "#00000080",
              color: "#fff",
              borderRadius: "6px",
            }}
          >
            🔁 New Quote
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div>
          <h2>⭐ Favorites</h2>
          <ul>
            {favorites.map((q) => (
              <li key={q._id} style={{ marginBottom: "1rem" }}>
                <q>{q.content}</q> — <b>{q.author}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
