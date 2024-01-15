import {useState} from 'react';
import ArrowLeft from '@spectrum-icons/workflow/ArrowLeft';
import ArrowRight from '@spectrum-icons/workflow/ArrowRight';
import './ImageSlider.css';

interface ImageSliderProps {
	imageUrls: string[];
}
export default function ImageSlider({imageUrls}: ImageSliderProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	function showNextImage() {
		setCurrentImageIndex((currentImageIndex + 1) % imageUrls.length);
	}
	function showPreviousImage() {
		if(currentImageIndex === 0) {
			setCurrentImageIndex(imageUrls.length - 1);
			return;
		}
		setCurrentImageIndex((currentImageIndex - 1) % imageUrls.length);
	}
	return <div style={{position: "relative"}}>
		<img src={imageUrls[currentImageIndex]} alt="Dog" key={currentImageIndex} className="slider-image"/>
		<button onClick={showPreviousImage} className='image-slider-btn' style={{left:0}}><ArrowLeft aria-label="S Beaker" size="S" /></button>
		<button onClick={showNextImage} className='image-slider-btn' style={{right:0}}><ArrowRight aria-label="S Beaker" size="S" /></button>
	</div>
}