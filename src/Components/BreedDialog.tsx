import { BreedContainer, BreedImage } from "../Common/breed";
import {useState, useEffect} from 'react';
import { Image, Header, View } from "@adobe/react-spectrum";
import ImageSlider from "./ImageSlider";

export default function BreedDialog({breed}: BreedContainer) {

	const [breedImages, setBreedImages] = useState<BreedImage[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://api.thedogapi.com/v1/images/search?limit=10&breed_ids='+breed.id, 
		{
			headers : {
				'x-api-key': 'live_Rnu5eAUOwfVYoIhxVMaVVHWKE6azHYKdQaT9nnj1DIg1asHwmjjPsIla0yupyg7w'
		}}).then(
		(response) => 
		{
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
		}).then(res => {
			if(breed.id === 420) {res = [{breeds:[], id: "420", url: "https://preview.redd.it/snoop-dogg-as-a-dog-v0-ytvhf6v7s5z91.png?auto=webp&s=74e5a0608eac04c8c35235f7eab2e6ffa5015a33", width: 420, height: 420}];}
			setBreedImages(res);
			setIsLoading(false);
		}).catch(e => {
			console.log("Error loading", e.message);
		});
	}, [breed.id]);

	return <div>
		{
			isLoading ? 
			(
				<Image src='https://media.tenor.com/0o5BGX30hkcAAAAi/after-effects-running.gif' alt='loadingdog'/>
			) : 
			(
				<>
					<ImageSlider imageUrls={breedImages.map(breedImage => breedImage.url)}/>
					<br/>
					<View >
						{breed.origin && <Header><b>Origin:</b> {breed.origin}</Header>}
						{breed.life_span && <Header><b>Life Span:</b> {breed.life_span}</Header>}
						{breed.bred_for && <Header><b>Bred For:</b> {breed.bred_for}</Header>}
						{breed.breed_group && <Header><b>Breed Group:</b> {breed.breed_group}</Header>}
						{breed.weight && <Header><b>Weight:</b> {breed.weight?.imperial} lbs / {breed.weight?.metric} kg </Header>}
						{breed.height && <Header><b>Height:</b> {breed.height?.imperial} lbs / {breed.height?.metric} kg </Header>}
						{breed.temperament && <Header><b>Temperament:</b> {breed.temperament}</Header>}
				</View>
				</>
			)
		}
	</div>;
}