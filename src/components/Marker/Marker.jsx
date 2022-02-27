import { Marker as GoogleMapMarker } from '@react-google-maps/api'

const Marker = ({position}) => {
	return (
		<GoogleMapMarker
			position={position}
			icon={{
				url: require("./marker.png"),
				scaledSize:{width: 30, height: 30}
			}}
		/>
	)
}

export {Marker}