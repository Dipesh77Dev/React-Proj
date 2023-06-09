import React, { useEffect, useState } from "react";
import "./App.css";

import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
  const [apiData, setApiData] = useState({});
  const [state, setState] = useState("maharashtra");
  const [getState, setGetState] = useState("maharashtra");

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  console.log(apiUrl, apiKey);

  //  const [state, setState] = useState("maharashtra"); - E = 'state' was used before it was defined

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const handleInput = (event) => {
    setGetState(event.target.value);
  };

  const handleSubmit = () => {
    setState(getState);
  };

  const ktf = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <>
      <div className="App">
        <header className="d-flex justify-content-center align-items-center">
          <h2>React Weather App</h2>
        </header>
        <div className="container">
          <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
            <div className="col-auto">
              <label for="location-name" className="col-form-label">
                Enter Location :
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="location-name"
                className="form-control"
                onChange={handleInput}
                value={getState}
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleSubmit}>
              Search
            </button>
          </div>

          <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
            {apiData.main ? (
              <div className="card-body text-center">
                <img
                  src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />

                <p className="h2">{ktf(apiData.main.temp)}&deg; C</p>

                <p className="h5">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  <strong>{apiData.name}</strong>
                </p>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <p>
                      <i className="fas fa-temperature-low "></i>{" "}
                      <strong>{ktf(apiData.main.temp_min)}&deg; C</strong>
                    </p>
                    <p>
                      <i className="fas fa-temperature-high"></i>{" "}
                      <strong>{ktf(apiData.main.temp_max)}&deg; C</strong>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {" "}
                      <strong>{apiData.weather[0].main}</strong>
                    </p>
                    <p>
                      <strong>
                        {" "}
                        {countries.getName(apiData.sys.country, "en", {
                          select: "official",
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <h1>Loading</h1>
            )}
          </div>
        </div>
        <footer className="footer">
          <code>
            Created by{" "}
            <a href="https://github.com/Dipesh77Dev" target="none">
              Dipesh(Raj)
            </a>{" "}
            using React
          </code>
        </footer>
      </div>
    </>
  );
}

export default App;
