const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/CRUDMYFORM',(err)=>{
	if(!err)
		console.log("mongodb connection successfully created...!!!");
	else
		console.log("Error in db connection"+ JSON.stringify(err,undefined,2));
});
module.exports=mongoose;   //for using outside this db.js file