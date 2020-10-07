const mongoose= require('mongoose');

//define schema 
var User=mongoose.model('User',{
	name:{ type: String },
	email:{ type: String },
	gender:{ type: String },
	address:{ type: String },
	city:{ type: String },
	zip:{ type: Number },
	domain:{ type: String },
	coverLetter:{ type: String },
	resume:{ type: String }
});

module.exports= { User };