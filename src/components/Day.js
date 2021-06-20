import React from 'react';
import './Style.css';

const Day = (props) => {

    const Days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateTime = new Date(props.dt * 1000);

    return (
        <div className="day-container">
            <div>
                <h2>{Days[dateTime.getDay()]}</h2>    
                <h3>{dateTime.getDate()} {months[dateTime.getMonth()]}</h3>
            </div>
            <img src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt="description of weather" height="80px"/>                      
            <div>
                <h3>{props.weatherDesc}</h3>
                <h3> max/min {props.max} <sup>o</sup>/ {props.min} <sup>o</sup> </h3>
            </div>            
        </div>
    );
}

export default Day;