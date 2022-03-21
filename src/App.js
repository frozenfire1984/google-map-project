import {useState, useCallback, useEffect} from 'react';
import {useJsApiLoader} from '@react-google-maps/api'
import {Map} from './components/Map/'
import {Autocomplete} from './components/Autocomplete/'
import Geocode from "react-geocode";
import s from './styles/App.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 59.9966621,
  lng: 30.2062085
};

const libraries = ['places'];

Geocode.setApiKey(API_KEY);
Geocode.setLocationType("ROOFTOP");

const App = ({place}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })
  
  useEffect(() => {
    if (place) {
      Geocode.fromAddress(place).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setCenterCoord({lat, lng})
          setMarkerCurrentCoord({lat, lng})
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      //console.log("get current address")
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenterCoord({lat, lng});
        setMarkerCurrentCoord({lat, lng});
      })
    }
  },[place])
  
  const [centerCoord, setCenterCoord] = useState(defaultCenter)
  const [markerCurrentCoord, setMarkerCurrentCoord] = useState(defaultCenter)
  const onSelectCoordinates = useCallback((coordinates) => {
    setCenterCoord(coordinates)
    setMarkerCurrentCoord(coordinates)
    //setIsFeedbackOn(false)
  },[]);
  
  return (
    <div className={s.app}>
      <div className={s.topbar}>
        <Autocomplete
          isLoaded={isLoaded}
          onSelectCoordinates={onSelectCoordinates}
          place={place}
        />
      </div>
      
      <div className={s.debugInfo}>
        {/*{isFeedbackOn.toString()}*/}
        <br/>
        {JSON.stringify(markerCurrentCoord, null, 1)}
      </div>
      {isLoaded
        ?
        <>
        {/*<div className="mapHolder"/>*/}
          <Map
            centerCoord={centerCoord}
            markerCurrentCoord={markerCurrentCoord}
            //mode={mode}
            //markers={markers}
            //onMarkerAdd={onMarkerAdd}
            //onMarkerReplace={onMarkerReplace}
          />
        </>
        : <>Loading...</>
      }
    </div>
  );
}

export default App;
