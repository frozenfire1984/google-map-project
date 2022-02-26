import {useState, useCallback, useEffect} from 'react';
import {useJsApiLoader} from '@react-google-maps/api'
import {Map, MODES} from './components/Map/'
import {Autocomplete} from './components/Autocomplete/'
import './index.css'
import './styles/style.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

/*const MODES = {
  MOVE: 0,
	SET_MARKER: 1
}*/

const libraries = ['places']

const App = () => {
  
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })
  
  const [center, setCenter] = useState(defaultCenter)
  const [mode, setMode] = useState(MODES.MOVE)
  const [marker, setMarker] = useState(MODES.MOVE)
  
  const onSelectCoordinates = useCallback((coordinates) => {
    setCenter(coordinates)
  },[]);
  
  const toggleMode = () => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break
      default:
        setMode(MODES.MOVE);
    }
    
    console.log(mode)
  }
  
  const onMarkerAdd = () => {
  
  }
  
  return (
    <div className="app">
      <div className="topbar">
        <Autocomplete
          isLoaded={isLoaded}
          onSelectCoordinates={onSelectCoordinates}
        />
        <button className="btn" onClick={toggleMode} on>Set marker</button>
        {mode}
      </div>
      {isLoaded
        ?
        <>
        {/*<div className="mapHolder"/>*/}
        <Map center={center} mode={mode} />
        </>
        : <>Loading...</>
      }
    </div>
  );
}

export default App;
