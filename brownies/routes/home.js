const express = require('express')
const router = express.Router()
const { ensureAuth} = require("../middleware/auth")
const Recipe = require('../model/Recipe')



//landing page
router.get('/',function(req,res,next){
  res.render('home',{layout: 'home',})
})


//dashboard
router.get('/index', ensureAuth,async function(req,res,next){
	try{
		const recipes = await Recipe.find({ user : req.user.id}).lean()
		res.render('index',{
			name:req.user.firstName,
			recipes,
		})
	}catch(err){
		console.error(err)
	}
	})

module.exports = router
