import {Marker} from '@react-google-maps/api'

const CurrentLocationMarker = ({position}) => {
	return (
		<Marker
			position={position}
			icon={{
				url: require("./marker_primary.png"),
				scaledSize:{width: 30, height: 40}
			}}
			/*label={{
				text: "S",
				fontSize: '10px',
				color: '#fff'
			}}*/
		/>
	)
}

export {CurrentLocationMarker}