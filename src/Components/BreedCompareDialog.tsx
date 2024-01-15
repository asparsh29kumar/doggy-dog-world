import {BreedCompareContainer} from '../Common/breed';
import React from 'react';
import {DialogContainer, Dialog, Button, TableHeader, TableView, Column, TableBody, Row, Cell, Heading, Header, Divider, Content, ButtonGroup, DialogTrigger} from '@adobe/react-spectrum'
import {ActionButton, Image} from '@adobe/react-spectrum';

const BreedCompareDialog : React.FC<BreedCompareContainer> = ({breeds, selectedForCompare}) => {
	let [isOpen, setOpen] = React.useState(false);
	return(
		<>
			{
				
				<>
					<div key='Compare it'>
						<br/>
						<Button variant="primary" staticColor='white' maxWidth='170px' width='30%' height='30px' onPress={() => setOpen(true)}>Compare</Button>
						<br/>
					</div>
					<DialogContainer type='fullscreen' onDismiss={() => setOpen(false)} >
						{isOpen &&
						<Dialog>
							<Heading>Compare</Heading>
							<Header>Pick Your Favourite!</Header>
							<Divider />
							<Content>
								<>
								<TableView aria-label="Example table with static contents" >
									<TableHeader>
										<Column width={116} isRowHeader>{"DP(Dog Pic)"}</Column>
										<Column width={194} isRowHeader>Breed</Column>
										<Column width={220} isRowHeader>Bred For</Column>
										<Column width={100} isRowHeader>Life Span</Column>
										<Column width={100} isRowHeader>Height</Column>
										<Column width={100} isRowHeader>Weight</Column>
										<Column width={150} isRowHeader>Breed Group</Column>
										<Column width={500} isRowHeader>Temperament</Column>
										<Column width={230} align="end">Origin</Column>
									</TableHeader>
									<TableBody>
									{selectedForCompare.map(id => {
												let breed = breeds.find(breed => breed.id === id);
												if(breed) {
													return <Row>
														<Cell>
															<DialogTrigger type='popover'>
															<ActionButton><img src={breed.image.url} width="60px" height="40px" alt='cute smol dog'/></ActionButton>
															<Dialog>
																<Heading>{breed.name}</Heading>
																<Divider />
																<Content>
																<Image src={breed.image.url} alt="doggydog"/>
																</Content>
															</Dialog>
															</DialogTrigger>
														</Cell>
														<Cell>{breed.name}</Cell>
														<Cell>{breed.bred_for}</Cell>
														<Cell>{breed.life_span}</Cell>
														<Cell>{breed.height.imperial} in</Cell>
														<Cell>{breed.weight.imperial} lbs</Cell>
														<Cell>{breed.breed_group}</Cell>
														<Cell>{breed.temperament}</Cell>
														<Cell>{breed.origin}</Cell>
													</Row>
												}
												return <></>;
											})}
									</TableBody>
								</TableView>
								</>
							</Content>
							<ButtonGroup>
								<Button variant="accent" onPress={()=>setOpen(false)}>Close</Button>
							</ButtonGroup>
						</Dialog>
						}
					</DialogContainer>
				</>
			}
		</>
	)
}
export default BreedCompareDialog;
