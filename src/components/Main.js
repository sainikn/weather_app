import React,{useState} from 'react';
import axios from 'axios'
import Header from './Header';
import Weather from './Weather';
import './Style.css'

const Main = () => {

    const [weather, setWeather] = useState([]);    
    const [location, setLocation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const apiCall = async (e) =>{
        e.preventDefault();
        setError('')
        
        if(location === undefined || location === ""){
            alert("Please enter location");
        }else{
            const LOCATION_API_KEY = 'pk.1233cfdcd47107f5a6a459bcb9c762f6';
            const WEATHER_API_KEY = 'fe3ff752d011c24126cbcb439fa89d45';
    
            const urlLatLon = `https://us1.locationiq.com/v1/search.php?key=${LOCATION_API_KEY}&q=${location}&format=json`;
            
            // set isLoading to inidicate about request processing
            setIsLoading(true) 

            axios.get(urlLatLon)
            .then((resLatLon)=>{
                const urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${resLatLon.data[0].lat}&lon=${resLatLon.data[0].lon}&units=metric&exclude=current,minutely,hourly&appid=${WEATHER_API_KEY}`;
                axios.get(urlWeather)
                .then((resWeather)=>{
                    console.log(resWeather);
                    setWeather(resWeather.data.daily);
                    
                    // re-set isLoading 
                    setIsLoading(false)
                })
                .catch(handleErrors);
            })
            .catch(handleErrors);
        }
    }

    function handleErrors(err){
        if(err.response){
            setError("Error - Unable to geocode this location");
            console.log("Unable to geocode", err.response.status);
        }else if(err.request){
            setError("Problem with request - " + err.message);
        }else{
            setError("Error", err.message);
            console.log("Error - ", err.message);
        }
        setIsLoading(false);
        setWeather(null);
    }

    const changeLocation = (e) => {
        setLocation(e.target.value)
        if(location === undefined || location === ""){
             setError('')
        }
    }

    return (
        <div>
            <Header/>
            <div className="center-container">                
                <form onSubmit={(e)=>{apiCall(e)}}>
                    <input placeholder="City, State" type="text" onChange={(e)=>{changeLocation(e)}} />
                    <button style={{margin:"1rem"}} onClick={(e)=>{apiCall(e)}}>Weather</button>
                </form>                
            </div>
            {
                 (
                    error ? (
                        <div className="center-container" style={{color: "red"}}>
                            <h1>
                                {error}
                            </h1>
                        </div>) : (
                            isLoading ? (
                                <div className="center-container">
                                    <h1>Please wait, while we fetch data for you...</h1>
                                </div>
                            ) : 
                        (
                            weather && <div className="center-container"><Weather weather={weather} /></div>
                        )
                    )                                        
                )
            }
        </div>
    );
}

export default Main;