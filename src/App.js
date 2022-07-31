import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchGame, setSearchGame] = useState("");
  const [games, setGames] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3"
    )
      .then((res) => res.json())
      .then((data) => setDeals(data));
  }, []);

  return (
    <div className="App">
      <div className="search">
        <h1>Search for a game!</h1>

        <input
          className="input-search"
          type="search"
          placeholder="search..."
          onChange={(event) => {
            return setSearchGame(event.target.value);
          }}
        ></input>
        <button
          className="btn-search"
          onClick={() => {
            return fetch(
              `https://www.cheapshark.com/api/1.0/games?title=${searchGame}&limit=3`
            )
              .then((res) => res.json())
              .then((data) => setGames(data));
          }}
        >
          Search Game Title
        </button>

        <div className="deals">
          {games.map((value, key) => {
            return (
              <div className="game-items" key={key}>
                <h3>{value.external}</h3>
                <img src={value.thumb} alt="videogame_image" />
                <p>Price: ${value.cheapest}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="deal-div">
        <h1>Latest Deals 🔥</h1>

        <div className="deals">
          {deals.map((value, key) => {
            return (
              <div className="deals-items" key={key}>
                <h3>{value.title}</h3>
                <p>Normal Price: ${value.normalPrice}</p>
                <p>Deal Price: ${value.salePrice}</p>
                <p>Savings: {value.savings.substr(0, 2)}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
