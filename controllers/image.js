
const  Clarifai =  require('clarifai');

const app = new Clarifai.App({
 apiKey: '87b5eb01a1b44f60aa27702bed42544d'
});

const handleApiCall = (req,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		//console.log(data)
		res.json(data)
	})	
	.catch(err => res.status(400).json('Api call failure'))
}


const handleImage =(req, res, db) => {

	const{id} = req.body ;
	
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries =>{
	  	res.json(entries)
	  })
	  .catch(err => res.status(400).json('Unable to update count'))
}

module.exports  = {
	handleImage:handleImage,
	handleApiCall:handleApiCall
}