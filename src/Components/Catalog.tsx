import doggydog from '../images/doggydog.png';
import {useEffect, useState} from 'react';
import { Breed } from '../Common/breed';
import Card from './Card';
import BreedCompareDialog from './BreedCompareDialog';
import {Button, SearchField, Flex} from '@adobe/react-spectrum';

export default function Catalog() {
	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [filteredBreeds, setFilteredBreeds] = useState<Breed[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');

	function addSelectedForCompare(id: number) {
		if(selectedForCompare.includes(id)) {
			setSelectedForCompare(selectedForCompare.filter((value) => value !== id));
			return;
		}
		setSelectedForCompare([...selectedForCompare, id]);
	}


  	useEffect(() => {
			fetch('https://api.thedogapi.com/v1/breeds', {headers:{'x-api-key': 'live_Rnu5eAUOwfVYoIhxVMaVVHWKE6azHYKdQaT9nnj1DIg1asHwmjjPsIla0yupyg7w'}}).then(
				(response) => 
				{
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					  }
					  return response.json();
				}).then(res => {
					res.push({
						breed: "Snoop Dogg",
						id: 420,
						life_span: "69 years",
						name: "Snoop Dogg",
						breed_group: "Rapper",
						origin: "California",
						temperament: "Cool, Calm, Collected, \"High\" Spirited",
						weight: {
							imperial: "420",
							metric: "420"
						},
						height: {
							imperial: "69",
							metric: "69"
						},
						bred_for: "Rapping",
						image: {
							id: "420",
							url: "https://preview.redd.it/snoop-dogg-as-a-dog-v0-ytvhf6v7s5z91.png?auto=webp&s=74e5a0608eac04c8c35235f7eab2e6ffa5015a33"
						},
						reference_image_id: "420",
						selectedForCompare: false
					})
					setBreeds(res);
					setIsLoading(false);
				}).catch(e => {
					console.log("Error loading", e.message);
				});
		}, []);
	
	useEffect(() => {
		let searchStringEscaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		let filtered = breeds.filter((breed: Breed) => breed.name?.toLowerCase().match(searchStringEscaped.trim().toLowerCase()));
        setFilteredBreeds(filtered);
    }, [searchQuery, breeds, selectedForCompare])
  return (
	<div className="App">

		<header style={{ textAlign: 'center' }}>
			<img src={doggydog} alt="doggydogworld" style={{ width: '100%', height: 'auto', maxHeight: '300px' }}/>
		</header>
		<br/>
		<SearchField isQuiet label="Search for a breed" value={searchQuery} width='50%' onChange={setSearchQuery}/>
		<br/>

		{
			(selectedForCompare.length > 0) ?
			(
				<>
					<BreedCompareDialog breeds={breeds} selectedForCompare={selectedForCompare}/>
					<br/>
				</>
			) : (<br/>)
		}
		<Flex gap="size-100" justifyContent="center">
			<Button variant="cta" onPress={() => {
				selectedForCompare.map(id => document.getElementById('checkbox-'+id.toString())?.click());
			}}>Deselect All</Button>
			<Button variant="cta" onPress={() => {
				selectedForCompare.map(id => document.getElementById('checkbox-'+id.toString())?.click());
				filteredBreeds.map(breed => document.getElementById('checkbox-'+breed.id.toString())?.click());
			}}>Select All </Button>
		</Flex>
		<br/>



		{
			isLoading ? 
			(
				<img src='https://media.tenor.com/0o5BGX30hkcAAAAi/after-effects-running.gif' alt='loadingdog'/>
			) : ( 
				<div className="kennel-cards-grid">
				{
					filteredBreeds.map(breed => (
						<Card breed={breed} onSelectionForCompare={addSelectedForCompare}/>
						))
				}
				</div>
			)
		}
	  </div>
	
  );
}