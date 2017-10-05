var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var connect = mongoose.connect('mongodb://localhost/tryblog');
var db = mongoose.connection;

var now = moment(new Date());
var dates = now.format("D MMM YYYY");

var postSchema = new mongoose.Schema({
	title:{type:String},
	categories:{type:String},
	author:{type:String},
	content:{type:String},
	date:{type:String,default:dates},


});

var categorySchema = new mongoose.Schema({
	category:{type:String}
});

var Post = module.exports = mongoose.model('Post',postSchema);
//var Category = module.exports = mongoose.model('Category',categorySchema);
