const mongoose = require('mongoose');

const connectDB = async() => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URL,
		{
			 useNewUrlParser: true,
			 useUnifiedTopology: true,
			 useFindAndModify: false,
		})
		console.log('Mongodb connected')
	}catch(err){
		console.error(err)
		process.exit(1)
	}
}

module.exports =connectDB
