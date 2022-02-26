import React, {useCallback, useRef} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import s from './Map.module.css'
import {defaultTheme} from './Theme'
import {CurrentLocationMarker} from './../CurrentLocationMarker'

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
	SET_MARKER: 1
}

const Map = ({center, mode}) => {
	
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
		if (mode === MODES.SET_MARKER) {
			const lat = loc.latLng.lat();
			const lng = loc.latLng.lng();
			console.log(lat, lng)
		
		} else {
			console.log(loc)
		}
	}
	
	return (
		<div className={s.mapHolder}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={defaultOptions}
				onClick={onSetMarkerMode}
			>
				<Marker position={center} />
				
				{/*{markers.map((pos) => {
					<Marker position={pos} />
				})}*/}
				
				}
				
			</GoogleMap>
		</div>
	)
}

export {Map, MODES}