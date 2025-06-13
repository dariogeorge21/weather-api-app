
import { useState } from 'react'
import './App.css'

function App() {
  const [Location,setLocation] = useState('');
  const [inputData, setinputData] = useState('');
  const [WeatherStats, setWeatherStats] = useState<null | {
    location: String;
    current: Object;
  }>(null);
  const [Celsius,setCelsius] = useState('');
  const [Fahrenheit,setFarenheit] = useState('');

  
  return (
    <>
      <header className="heading">Weather API APP</header>
      <br /><br />
      <div className="formContainer">
        <input type="number" className='inputField' placeholder='Enter Location' value={inputData} onChange={(e) => setinputData(e.target.value)} />
        <button>Check</button>
        
      </div>
      <hr className='hr'/>
      <br /><br />
      <div className="stats">
        <p className="location">Location: </p>
        <p className="temperatureCelsius">Temperature in Celsius: </p>
        <p className="temperatureFahrenheit">Temperature in Fahrenheit: </p>
        <p className="humidity">Humidity: </p>

      </div>
    </>
  )
}

export default App
