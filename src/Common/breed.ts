export interface Breed {
	bred_for: string;
	breed_group: string;
	height: {imperial: string, metric: string};
	id: number;
	image: {height: number, id: string, url: string, width: number};
	life_span: string;
	name: string;
	origin: string;
	reference_image_id: string;
	temperament: string;
	weight: {imperial: string, metric: string};
	selectedForCompare?: boolean;
  }

export interface BreedContainer{
	breed: Breed
}

export interface BreedCompareCard{
	breed: Breed;
	onSelectionForCompare: (id: number) => void;
}

export interface BreedCompareContainer{
	breeds: Breed[];
	selectedForCompare: number[];
}

export interface BreedImage{
	breeds: Breed[];
	id: string;
	url: string;
	width: number;
	height: number;
}