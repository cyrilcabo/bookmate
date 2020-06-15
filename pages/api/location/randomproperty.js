import database from '../../../utils/database';

const randomProperty = async (req, res) => {
	const result = await database().then(db => db.collection('locations').aggregate([{$sample: {size: 1}}]).toArray());
	res.status(200).json({id: result[0]._id});
}

export default randomProperty;