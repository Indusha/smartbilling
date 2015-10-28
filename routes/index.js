var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var mongo = require('mongoskin');
var db=mongo.db("mongodb://localhost:27017/billing", {
reconnectTries: 5,
autoReconnect: true,
native_parser:true
});

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('body', { title: 'Express' });
});

router.get('/manageclient', function(req, res, next) {
	db.collection('addclient').find({}).toArray(function(err,records){
		res.render('manageclient', { title: 'Express' ,userdetails:records});
	});
});
router.get('/manageproduct', function(req, res, next) {
	db.collection('addproduct').find({}).toArray(function(err,records){
		res.render('manageproduct', { title: 'Express' ,productdetails:records});
	});
});
router.get('/addclient',function(req,res,next){
	res.render('addclient',{ title: 'Express'});
});
router.get('/addproduct',function(req,res,next){
	res.render('addproduct',{ title: 'Express'});
});

router.post('/manageclients',function(req,res,next){
	var data = {name:req.body.clientname,email:req.body.clientemail,mobilenum:req.body.clientmobilenum,address:req.body.clientaddress};
	db.collection('addclient').insert(data,function(err,records){
		db.collection('addclient').find({}).toArray(function(err,data){
			res.render('manageclient', { title: 'Express' ,userdetails:data});
			console.log(err);
		});
	});
});
router.post('/manageproducts',function(req,res,next){
	var data = {code:req.body.productcode,name:req.body.productname,specification:req.body.productspec,price:req.body.productprice,mrp:req.body.productmrp,stock:req.body.productstock};
	db.collection('addproduct').insert(data,function(err,records){
		db.collection('addproduct').find({}).toArray(function(err,data){
			res.render('manageproduct', { title: 'Express' ,productdetails:data});
			console.log(err);
		});
	});
});

router.get('/removeclient/:id',function(req,res,next){
	var o_id = new ObjectID(req.params.id);
	console.log(o_id);
	db.collection('addclient').remove({"_id":o_id},function(err,records){
		console.log("err", err);
		console.log("records", records);
	});
	res.json(req.params.id);
});
module.exports = router;