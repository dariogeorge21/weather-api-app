
import { useState } from 'react'
import './App.css'

type WeatherStatsType = {
  location: { name: string };
  current: { temp_c: number; temp_f: number; humidity: number };
};

function App() {
  const [inputData, setinputData] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [WeatherStats, setWeatherStats] = useState<WeatherStatsType | null>(null);


  const stats = async() => {
    setErrorMessage('');
    setWeatherStats(null);

    try{
      const location = inputData;
      const query = location.trim().replace(/\s+/g, '+');
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}`);
      if (!response.ok){
        throw new Error("Failed to fetch from the API!");
      }
      
      const data = await response.json();
      
      setWeatherStats({
          location: {
            name: data.location.name,
          },
          current: {
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            humidity: data.current.humidity,
          },
        });

      setinputData('');
    } catch(error){
      if (error instanceof Error){
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occured!");
      }
    }
  }


  return (
    <>
      <header className="heading">Weather API APP</header>
      <br /><br />
      <div className="formContainer">
        <input type="text" className='inputField' placeholder='Enter Location' value={inputData} onChange={(e) => setinputData(e.target.value)} />
        <button onClick={stats} disabled={!inputData.trim()}>Check</button>
          
      </div>
      <hr className='hr'/>
      <br /><br />
      <div className="stats">
        <p className="location">{WeatherStats && `Location: ${WeatherStats.location.name}`}</p>
        <p className="temperatureCelsius">{WeatherStats && `Temperature in Celsius: ${WeatherStats.current.temp_c}`}</p>
        <p className="temperatureFahrenheit">{WeatherStats && `Temperature in Farenheit: ${WeatherStats.current.temp_f}`}</p>
        <p className="humidity">{WeatherStats && `Humidity: ${WeatherStats.current.humidity}`}</p>

      </div>
      {ErrorMessage && <p className='error' >{ErrorMessage}</p>}
    </>
  )
}

export default App
