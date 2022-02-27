import React, {useCallback, useRef} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import s from './Map.module.css'
//import {defaultTheme} from './Theme'
import {Marker as StyledMarker} from '../Marker'
import {CurrentLocationMarker} from '../CurrentLocationMarker'

const containerStyle = {
	width: '100%',
	height: '100%'
};



const defaultOptions = {
	panControl: true,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	clickableIcons: true,
	keyboardShortcuts: false,
	scrollwheel: true,
	disableDoubleClickZoom: false,
	fullscreenControl: false,
	//styles: defaultTheme,
}

const MODES = {
	MOVE: 0,
	SET_MARKER: 1,
	SINGLE: 2,
}

const mapProps = {}

const Map = ({centerCoord, markerCurrentCoord, mode, markers, onMarkerAdd, onMarkerReplace}) => {
	
	console.log("msg from Map")
	
	const mapRef = React.useRef(undefined)
	
	const onLoad = React.useCallback(function test(map) {
		mapRef.current = map
		console.log(mapRef.current)
	},[])
	
	const onUnmount = React.useCallback(function test(map) {
		mapRef.current = undefined
	},[])
	
	const onSetMarkerMode = (loc) => {
		const lat = loc.latLng.lat();
		const lng = loc.latLng.lng();
		
		switch (mode) {
			case MODES.MOVE:
				console.log("move")
				break
			case MODES.SET_MARKER:
				onMarkerAdd({lat, lng})
				break
			case MODES.SINGLE:
				onMarkerReplace({lat, lng})
				break
			default:
				console.log("move")
		}
	}
	
	return (
		<div className={s.mapHolder}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={centerCoord}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={defaultOptions}
				onClick={onSetMarkerMode}
			>
				<Marker position={markerCurrentCoord} />
				
				
				{markers.map((pos) => {
					return <Marker position={pos}  />
				})}
				}
			</GoogleMap>
		</div>
	)
}

export {Map, MODES}