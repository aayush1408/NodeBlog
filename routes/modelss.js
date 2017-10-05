var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var connect = mongoose.connect('mongodb://localhost/tryblog');
var db = mongoose.connection;




var commentSchema = new mongoose.Schema({
	id:{type:String},
	name:{type:String},
	email:{type:String},
	comment:{type:String}

});

var Comment = module.exports = mongoose.model('Comment',commentSchema);