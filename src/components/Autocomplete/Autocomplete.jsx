import {useEffect, useState, memo} from "react";
import usePlacesAutocomplete, { getGeocode,getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import s from './Autocomplete.module.css'

const Autocomplete = (
	{
		isLoaded,
		onSelectCoordinates,
		place
		//markerCurrentCoord,
		//isFeedbackOn
	}) => {
	
	
	
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
		init,
	} = usePlacesAutocomplete({
		initOnMount: false,
		debounce: 300,
		defaultValue: place,
	});
	const ref = useOnclickOutside(() => {
		clearSuggestions();
	});
	
	const handleInput = (e) => {
		setValue(e.target.value);
	};
	
	//console.log("msg from Autocomplete")
	
	//const [newValueFromMap, setNewValueFromMap] = useState("")
	
	const handleSelect =
		({ description }) =>
			() => {
				setValue(description, false);
				clearSuggestions();
				getGeocode({ address: description })
					.then((results) => getLatLng(results[0]))
					.then(({ lat, lng }) => {
						onSelectCoordinates({
							lat: lat,
							lng: lng,
						})
					})
					.catch((error) => {
						console.log("Error: ", error);
					});
			};
	
	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;
			
			return (
				<li className={s.autocomplete__item} key={place_id} onClick={handleSelect(suggestion)}>
					<span className={s.autocomplete__itemTitle}>{main_text}</span>
					<span className={s.autocomplete__itemAddition}>{secondary_text}</span>
				</li>
			);
		});
	
	useEffect(() => {
		if (isLoaded) {
			init()
		}
	},[isLoaded, init])
	
	/*useEffect(() => {
		if (isFeedbackOn) {
			console.log("set new value of Autocomplete!")
			setNewValueFromMap("New address!")
		}
	},[markerCurrentCoord, isFeedbackOn])*/
	
	return (
		<div ref={ref} className={s.autocomplete}>
			<input
				//value={newValueFromMap.length > 0 ? newValueFromMap : value}
				value={value}
				onChange={handleInput}
				disabled={!ready}
				placeholder="Where are you going?"
				type="search"
				className={s.autocomplete__input}
			/>
			{status === "OK" && <ul className={s.autocomplete__dropdown}>{renderSuggestions()}</ul>}
			 
			{/*<ul className={s.autocomplete__dropdown}>
				{[1,2,3].map((value, index, array) =>
					<li className={s.autocomplete__item} key={index}>
						<span className={s.autocomplete__itemTitle}>London</span>
						<span className={s.autocomplete__itemAddition}>United Kingdon</span>
					</li>
				)}
			</ul>*/}
			
		</div>
	);
};

export {Autocomplete}