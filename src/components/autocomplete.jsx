import React, { useCallback, useEffect, useState } from "react";
import SuggestionList from "./suggestions-list";
import debounce from "lodash.debounce";

const AutoComplete = ({
	staticData,
	fetchSuggestions,
	placeholder = "",
	customLoading = "Loading...",
	onSelect = () => {},
	onBlur = () => {},
	onFocus = () => {},
	onChange = () => {},
	customStyles = {},
	dataKey = "",
}) => {
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	console.log(suggestions);

	//const { setCache, getCache } = useCache("autocomplete", 3600);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
		onChange(e.target.value);
	};

	const getSuggestions = async (query) => {
		setError(null);
		setLoading(true);
		try {
			let result;
			if (staticData) {
				result = staticData.filter((item) => {
					return item.toLowerCase().includes(query.toLowerCase());
				});
			} else if (fetchSuggestions) {
				result = await fetchSuggestions(query);
			}
			setSuggestions(result);
		} catch (error) {
			setError("Failed to fetch suggestions");
			setSuggestions([]);
		} finally {
			setLoading(false);
		}
	};

	const getSuggestionsDebounced = useCallback(
		debounce(getSuggestions, 300),
		[]
	);

	useEffect(() => {
		if (inputValue.length > 1) {
			getSuggestionsDebounced(inputValue);
		} else {
			setSuggestions([]);
		}
	}, [inputValue]);

	return (
		<div className="container">
			<input
				type="text"
				value={inputValue}
				placeholder={placeholder}
				style={customStyles}
				onBlur={onBlur}
				onFocus={onFocus}
				onChange={handleInputChange}
			/>
			{(suggestions.length > 0 || loading || error) && (
				<ul>
					{error && <div>{error}</div>}
					{loading && <div>{customLoading}</div>}
					<SuggestionList
						dataKey={dataKey}
						highlight={inputValue}
						suggestions={suggestions}
						onSuggestionClick={handleInputChange}
					/>
				</ul>
			)}
		</div>
	);
};

export default AutoComplete;
