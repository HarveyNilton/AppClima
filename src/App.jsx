import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import SplashScreeam from './components/SplashScreeam'


function App() {
  const [clima, setClima] = useState({})
  const [change, setChange] = useState(true)

  const [load, setLoad] = useState(false)
  
  setTimeout(() => {
    setLoad(false)

    }, 5000);

  useEffect(()=>{
    

    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=183d97d3803189cf9338bbc54a4dd296`)
      .then(resp => setClima(resp.data))
      
    }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error);

     
       setLoad(true)
  },[])

 

  const degreeCentigrade = clima.main?.temp-273.15
  const turnIntoFarenheit = (degreeCentigrade*9/5)+32
  const degree = degreeCentigrade.toFixed(2)
  const farenheit = turnIntoFarenheit.toFixed(2)

  const changeTemp = ()=>{
    setChange(!change)
  }
  
  return (
    <div className="App">
      {load && <SplashScreeam/>}
      <div className='card-clima'>
        <h3 className="title">Wheather App</h3>
        <h4 className="sub-title">{`${clima.sys?.country} - ${clima.name}`}</h4>
        <div className="contatiner-information">
          <img className="image" src={`http://openweathermap.org/img/wn/${clima.weather?.[0].icon}@2x.png`} alt="" />
          <section className="description">
            <h4 className="scattered">"Scattered clouds"</h4>
            <figure className='wind-speed'>
              <img className='imag-icon' src="/windspeed.svg" alt="" />
              <h4 className='item'>Wind speed:</h4><p>{clima.wind?.speed} m/s</p></figure>
            <figure className='wind-speed'>
              <img className='imag-icon' src="/cloud.svg" alt="" />
            <h4 className='item'>Clouds:</h4><p>{clima.clouds?.all} %</p></figure>
            <figure className='wind-speed'>
              <img className='imag-icon' src="/presion.svg" alt="" />
              <h4 className='item'>Pressure: </h4><p>{clima.main?.pressure} mbar</p></figure>
          </section>
        </div>
        <h2 className="temperature">{`${change ? degree : farenheit} ${change ? 'ºC' : 'ºF'}`}</h2>
        <button className='button' onClick={changeTemp}> <img className='icon-button' src={change ? "/centigradeicon.svg" :"/farenheiticon.svg"} alt="" />{change ? 'To degress ºF':'To degress ºC'}</button>
      </div>
      
    </div>
  )
}

export default App
