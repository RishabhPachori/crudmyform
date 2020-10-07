const express= require('express');
var router= express.Router(); //calling router() from express constant

//require multer for the file uploads
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + file.originalname)
	}
  })
  
  var upload = multer({ storage: storage })

var ObjectId= require('mongoose').Types.ObjectId;

var { User }= require('../model/user');

//baseUrl=> localhost:3001/users/
//retrieve all the users from the user collection==>get endpoint
router.get('/',(req,res) => {
	User.find((err,docs) => {             
		if(!err) {res.send(docs); }
		else { console.log("Error in Retrieving Users"+ JSON.stringify(err,undefined,2)) };
	});    
});

//retrieve user by hitting a particular id in the route
router.get('/:id',(req,res) => {
	if(!ObjectId.isValid(req.params.id)) //check id is valid or not
		return res.status(400).send(`No record with given Id: ${req.params.id}`);
	User.findById(req.params.id,(err,doc) =>{
		if(!err) {res.send(doc); }
		else { console.log("Error in Retrieving Users"+ JSON.stringify(err,undefined,2)) };
	});
});

//post endpoint used for insert data in users collection
router.post('/', upload.single('resume'),(req,res) => {
	var user= new User({
		name:req.body.name,
		email:req.body.email,
		gender:req.body.gender,
		address:req.body.address,
		city:req.body.city,
		zip:req.body.zip,
		domain:req.body.domain,
		coverLetter:req.body.coverLetter,
		resume:req.file.path,
	});
	user.save((err,doc) => {
		if(!err) {res.send(doc); }
		else { console.log("Error in Save Users"+ JSON.stringify(err,undefined,2)) };
	});
});

//put endpoint used for updating data on a particular id in the users collections
router.put('/:id', upload.single('resume'),(req,res) => {
	if(!ObjectId.isValid(req.params.id)) //check id is valid or not
		return res.status(400).send(`No record with given Id: ${req.params.id}`);
	var user= {
		name:req.body.name,
		email:req.body.email,
		gender:req.body.gender,
		address:req.body.address,
		city:req.body.city,
		zip:req.body.zip,
		domain:req.body.domain,
		coverLetter:req.body.coverLetter,
		resume:req.file.path,
	};
	User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err,doc) =>{
		if(!err) {res.send(doc); }
		else { console.log("Error in Update Users"+ JSON.stringify(err,undefined,2)) };
	});
});

//delete endpoint used for delete data on a particular id in the users collections

router.delete('/:id',(req,res) => {
	if(!ObjectId.isValid(req.params.id)) //check id is valid or not
		return res.status(400).send(`No record with given Id: ${req.params.id}`);
	User.findByIdAndRemove(req.params.id,(err,doc) =>{
		if(!err) {res.send(doc); }
		else { console.log("Error in Delete Users"+ JSON.stringify(err,undefined,2)) };
	});
});


module.exports= router;