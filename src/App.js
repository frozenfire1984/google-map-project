import {useState, useCallback, useEffect} from 'react';
import Switch, { Case, Default } from 'react-switch-case';
import {useJsApiLoader} from '@react-google-maps/api'
import {Map, MODES} from './components/Map/'
import {Autocomplete} from './components/Autocomplete/'
import s from './styles/App.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

const libraries = ['places']

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })
  
  const [centerCoord, setCenterCoord] = useState(defaultCenter)
  const [mode, setMode] = useState(MODES.SINGLE)
  const [markerCurrentCoord, setMarkerCurrentCoord] = useState(defaultCenter)
  const [markers, setMarkers] = useState([])
  
  const [isFeedbackOn, setIsFeedbackOn] = useState(false)
  
  const onSelectCoordinates = useCallback((coordinates) => {
    setCenterCoord(coordinates)
    setMarkerCurrentCoord(coordinates)
    setIsFeedbackOn(false)
  },[]);
  
  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break
      case MODES.SET_MARKER:
        setMode(MODES.SINGLE);
        break
      case MODES.SINGLE:
        setMode(MODES.MOVE);
        break
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode)
  },[mode])
  
  const onMarkerAdd = (coordinates) => {
    setMarkers([...markers, coordinates])
  }
  
  const onMarkerReplace = (coordinates) => {
    setMarkerCurrentCoord(coordinates)
    setIsFeedbackOn(true)
  }
  
  const onClearAll = () => {
    setMarkers([])
  }
  
  return (
    <div className={s.app}>
      
      <div className={s.topbar}>
        <Autocomplete
          isLoaded={isLoaded}
          onSelectCoordinates={onSelectCoordinates}
          markerCurrentCoord={markerCurrentCoord}
          isFeedbackOn={isFeedbackOn}
        />
        <button className={s.btn} onClick={toggleMode}>
          Toggle marker -->&nbsp;
          <span className={s.btn__status}>
            <Switch condition={mode}>
              <Case value={0}>
                Move mode
              </Case>
              <Case value={1}>
                Addition mode
              </Case>
              <Case value={2}>
                Single mode
              </Case>
              <Default>
                mode is undefined!
              </Default>
            </Switch>
          </span>
        </button>
        <button className={s.btn} onClick={onClearAll}>
          Clear all markers
        </button>
      </div>
      
      <div className={s.debugInfo}>
  
        {isFeedbackOn.toString()}
        <br/>
        {JSON.stringify(markerCurrentCoord, null, 1)}
        {/*{mode}
        <br/>
        {JSON.stringify(markers, null, 1)}*/}
      </div>
      {isLoaded
        ?
        <>
        {/*<div className="mapHolder"/>*/}
          <Map
            centerCoord={centerCoord}
            markerCurrentCoord={markerCurrentCoord}
            mode={mode}
            markers={markers}
            onMarkerAdd={onMarkerAdd}
            onMarkerReplace={onMarkerReplace}
          />
        </>
        : <>Loading...</>
      }
    </div>
  );
}

export default App;
