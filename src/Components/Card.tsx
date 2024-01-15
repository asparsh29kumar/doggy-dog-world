import {BreedCompareCard} from '../Common/breed';
import React from 'react';
import {DialogContainer, AlertDialog, Checkbox} from '@adobe/react-spectrum'
import BreedDialog from './BreedDialog';

const Card : React.FC<BreedCompareCard> = ({breed, onSelectionForCompare}) => {
	let [isOpen, setOpen] = React.useState(false);
	return(
		<>
			{
				
				<>
					<div className="fancy-kennel-card" key={breed.id} onClick={() => setOpen(true)}>
						<div>
						<img src={breed.image.url} alt="Dog" key={breed.image.id}/>
						<div className="fancy-kennel-door"><h2 className="fancy-kennel-content">{breed.name}</h2></div>
						</div>
						<Checkbox onChange={()=>{breed.selectedForCompare = !breed.selectedForCompare;onSelectionForCompare(breed.id)}} 
							position={'absolute'} 
							top={'5px'} 
							right={'5px'} 
							width={'20px'} 
							height={'20px'} 
							aria-label='something'
							id={'checkbox-'+breed.id.toString()}
							isSelected={breed.selectedForCompare}
							/>
					</div>
					<DialogContainer onDismiss={() => setOpen(false)} >
						{isOpen &&
						<AlertDialog
							title={breed.name}
							variant="destructive"
							primaryActionLabel="Close">
								<BreedDialog breed={breed}/>
						</AlertDialog>
						}
					</DialogContainer>
				</>
			}
		</>
	)
}
export default Card;
