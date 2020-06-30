const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  title :{
			type:String,
			required:true,
			trim: true
	},
	recipe :{
			type:String,
			required:true
	},
	status :{
			type:String,
			default: 'private',
			enum: ['public', 'private']
	},
	user :{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
	},
	createdAt:{
		type: Date,
		default:Date.now
	}
})


module.exports = mongoose.model('Recipe',RecipeSchema)
