const express = require('express')
const router= express.Router()
const Recipe  = require('../model/Recipe')
const { ensureAuth} = require("../middleware/auth")
// add recipe page
router.get('/', ensureAuth, function(req,res){
  res.render('add')
})


//adding recipe to db

router.post('/', ensureAuth,  async function(req,res){
	try{
		req.body.user=req.user.id
		await Recipe.create(req.body)
		res.redirect('/index')
	}catch(err){
		console.error(err)
	}
})



//view all public stories
router.get('/view', ensureAuth,  async function(req,res){
	try{
		const recipes = await Recipe.find({ status: 'public'})
		.populate('user')
		.sort({ createdAt : 'desc'})
		.lean()
		res.render('view' ,{ recipes,})
  }catch(err){
		console.error(err)
	}
})


//view a single recipe
router.get('/:id', ensureAuth, async function(req,res){
  try {
    let recipes = await Recipe.findById(req.params.id).populate('user').lean()
    if (!recipes) {
      console.error(err)
    }
  		res.render('recipes',{
  			recipes,
  		})
  	}catch(err){
    console.log(err)
  }
})


//open edit page
router.get('/edit/:id', ensureAuth,  async function(req,res){
	const recipes = await Recipe.findOne({ _id: req.params.id,}).lean()
	if(!recipes){
		console.log(err)
	}
	if(recipes.user != req.user.id){
		res.redirect('/index')
	}else{
		res.render('edit',{
			recipes,
		})
	}
})



//entering edited data in db
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let recipes = await Recipe.findById(req.params.id).lean()
    if (!recipes) {
      console.log("error")
    }
    if (recipes.user != req.user.id) {
      res.redirect('/index')
    } else {
      recipes = await Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      res.redirect('/index')
    }
  } catch (err) {
    console.error(err)
  }
})


//deleting from db
router.get('/delete/:id', ensureAuth,  async function(req,res){
	try{
		await Recipe.remove({_id: req.params.id})
		res.redirect('/index')
	}catch(err){
		console.log(err)
	}
})





module.exports=router
