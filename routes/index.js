var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./model');
var Category = require('./models');
var Comment = require('./modelss');
var multer = require('multer');
var fs = require('fs');




/* GET home page. */
router.get('/',function(req, res, next) {

	Post.find({}).exec(function(err,result){
		if(err){
			console.log('error');

		}
		else{
			console.log(result);

			res.render('index',{result:result});
}
	});

});

//Add category
router.post('/addcategory',function(req, res, next) {

			var category  = req.body.category;

			var newCategory  = new Category({
				'category':category
			});

			newCategory.save(function(err){

		
			if(err) throw err;

					else{
						Category.find({}).exec(function(err,results){
							if(err){
								console.log(err);
							}
							else{

								console.log(results);
								res.render('post', { results : results });
		

							}
						});
					}

			});

  			

	});


//Add Comments

router.post('/addcomment/:id',function(req,res,next){

	var name = req.body.name;
	var email = req.body.email;
	var comment = req.body.comment;
	var id = req.params.id;

	var newComment = new Comment({
		name:name,
		email:email,
		comment:comment,
		id:id

	});

	newComment.save(function(err){
		if (err){
			console.log('Error');
		}
		else{
			console.log('Comment Added');
		}
	});


	Comment.find({id:id}).exec(function(err,comments){
		if(err){
			console.log('Error');
		}
		else{
			console.log(comments);
			Post.find({}).exec(function(err,results){
				if(err){
					console.log('Erorr');
				}
				else{
					console.log(results);
					res.render('post',{results:results,comments:comments})
				}

	})		
		}
	});

});
					
//GET category page
router.get('/categories', function(req, res, next) {
 	res.render('categories', { title: 'Express' });
});


//Get posts page with the category in it.
router.get('/posts', function(req, res, next) {
	Category.find({}).exec(function(err,results){
							if(err){
								console.log(err);
							}
							else{

								console.log(results);
								res.render('post', { results : results });
							}
						});
 
});


//Adding posts
router.post('/add',function(req,res,next){

 
    var title = req.body.title;
	var categories = req.body.categories;
	var author = req.body.author;
	var content = req.body.content;
	var date = req.body.date;
	



	var newPost = new Post({
		title:title,
		categories:categories,
		author:author,
		content:content,
		date:date
		});
 	
 	newPost.save(function(err){
 		if (err) throw err;
 		else{
 			console.log('Saved');
 			res.redirect('/');
 		}
});

 });


router.get('/read/:id',function(req,res,next){
		Post.find({_id:req.params.id}).exec(function(err,result){
				if(err){
					console.log('Error');
				}
				else{
					Comment.find({id:req.params.id}).exec(function(err,comments){
				if(err){
					console.log('errror');
				}
				else{
				res.render('read', { result: result,comments:comments });
				}
			});
					
		}
	});
							
});
					
					
				
	
module.exports = router;
