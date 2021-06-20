import React from 'react';
import Day from './Day';

const Weather = (props) => {

    const weather = props.weather.slice(0,7);
    
    const days = weather.map((day, index)=>{
        return <Day key={index} dt={day.dt} icon={day.weather[0].icon} weatherDesc={day.weather[0].description} min={day.temp.min.toFixed(1)} max={day.temp.max.toFixed(1)}/>      
    })
    
    return (
        <div>
            {days}
        </div>
    );
}

export default Weather;