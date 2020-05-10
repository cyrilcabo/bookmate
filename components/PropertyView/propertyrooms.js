import React from 'react';
import PreviewTest from '../previewtest';

import PropertyContainerTest from '../PropertyContainer/propertycontainertest';

const PropertyRooms = (props) => {
	const rooms = props.rooms.map(room => {
		const disabled = !!room.state.available;
		return <PropertyContainerTest
			price={room.price} 
			rating={5}
			amenities={room.amenities}
			imgSrc={room.imgSrc} 
			title={room.title}
			details={room.details}
			handleBook={disabled ?() => null :props.handleBook.bind(this, room)}
			moredetails={disabled ?<h5 style={{color: "maroon"}}> SOLD OUT! </h5> :""}
			disabled={disabled}
		/>
	});
	return (
		<React.Fragment>
			<PreviewTest>
				{rooms}
			</PreviewTest>
		</React.Fragment>
	);
}

export default PropertyRooms;