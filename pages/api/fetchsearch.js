import database from '../../utils/database';

const fetchSearch = async (req, res) => {
	const {location} = req.query;
	const result = await database().then(db => {
		return db.collection('locations').aggregate([
			{
				$match: {
					location: new RegExp(location, 'i'),
				}
			},
			{
				$limit: 5,
			},
			{
				$project: {
					_id: 1,
					location: 1,
					address: 1,
					properties: {
						$size: "$properties"
					}
				}
			}
		]).toArray();
	});
	res.json({status: 'ok', result: result});
}

export default fetchSearch;