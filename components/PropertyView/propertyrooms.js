import React from 'react';

import PreviewTest from '../Preview/previewtest';
import CardContainer from './cardcontainer';

import PropertyContainerTest from '../PropertyContainer/propertycontainertest';

const PropertyRooms = (props) => {
	const rooms = props.rooms.map((room, index) => {
		const disabled = !room.state.available;
		return <PropertyContainerTest
			price={room.price} 
			amenities={room.amenities}
			imgSrc={room.imgSrc} 
			title={room.title}
			pax={room.pax}
			size={room.size}
			details={room.details}
			handleBook={disabled ?() => null :props.handleBook.bind(this, room)}
			moredetails={disabled ?<h5 style={{color: "maroon"}}> SOLD OUT! </h5> :""}
			disabled={disabled}
			key={index}
		/>
	});
	return (
		<CardContainer title={"Rooms"}>
			<PreviewTest style={{width: '100%'}}>
				{rooms}
			</PreviewTest>
		</CardContainer>
	);
}

export default PropertyRooms;