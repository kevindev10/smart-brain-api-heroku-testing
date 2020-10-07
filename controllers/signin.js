const handleSignin = (req, res, bcrypt, db) =>{

	if( !req.body.email || !req.body.password){
		return res.json('Failed to signin.Try again')
	}
	 db.select('email', 'hash').from('login')
	 .where('email','=',req.body.email)
	 .then(data => {
	 	const isValid =bcrypt.compareSync(req.body.password, data[0].hash);
	 	if (isValid){
	 		return db.select('*').from('users')
	 				 .where('email', '=', req.body.email)
			 		 .then(user =>{
			 		 	res.json(user[0])
			 		 })
			 		 .catch(err => res.status(400).json('Unable to get user'))
		}else{
			res.status(400).json('Wrong credentials1')
		}
			 	
	  })
	 .catch(err => res.status(400).json('Wrong credentials2'))	
}

module.exports = {
	handleSignin: handleSignin
}