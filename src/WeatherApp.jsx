import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "e66a7382dc1048be9cd151655252706"; 

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Invalid city");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
       await new Promise((resolve) => setTimeout(resolve, 500)); 
       setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", display:"flex" , justifyContent:"center", flexDirection:"column",alignItems:"center", marginTop:"50px", gap:"20px" }}>
        <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", marginRight: "10px", width: "200px", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      <button onClick={handleSearch} style={{ padding: "8px 16px", background:"green", color: "whitesmoke", borderRadius: "4px", cursor: "pointer" }}>
        Search
      </button>
      </div>

      {loading ? <p>Loading data…</p> : null}

      {weather && (
        <div className="weather-cards" style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <div className="weather-card" style={cardStyle}>
            <strong>Temperature:</strong>
            <div>{weather.current.temp_c}°C</div>
          </div>

          <div className="weather-card" style={cardStyle}>
            <strong>Humidity:</strong>
            <div>{weather.current.humidity}%</div>
          </div>

          <div className="weather-card" style={cardStyle}>
            <strong>Condition:</strong>
            <div>{weather.current.condition.text}</div>
          </div>

          <div className="weather-card" style={cardStyle}>
            <strong>Wind Speed:</strong>
            <div>{weather.current.wind_kph} kph</div>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "15px",
  minWidth: "150px",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

export default WeatherApp;
