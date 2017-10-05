var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var connect = mongoose.connect('mongodb://localhost/tryblog');
var db = mongoose.connection;




var categorySchema = new mongoose.Schema({
	category:{type:String}
});

var Category = module.exports = mongoose.model('Category',categorySchema);