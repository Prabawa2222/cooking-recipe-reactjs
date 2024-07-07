import "./App.css";
import AutoComplete from "./components/autocomplete";

function App() {
	const staticData = ["apple", "banana", "berry"];

	const fetchSuggestions = async (query) => {
		const response = await fetch(
			`https://dummyjson.com/recipes/search?q=${query}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const result = await response.json();
		return result.recipes;
	};

	return (
		<div>
			<AutoComplete
				placeholder={"Enter Recipe"}
				// staticData={staticData}
				fetchSuggestions={fetchSuggestions}
				dataKey={"name"}
				customLoading={<>Loading Recipes...</>}
				onSelect={(res) => console.log()}
				onChange={(input) => {}}
				onBlur={(e) => {}}
				onFocus={(e) => {}}
				customStyles={{}}
			/>
		</div>
	);
}

export default App;
