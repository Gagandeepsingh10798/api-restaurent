try{
const db  = require('./db'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = db.Schema({
  u_pic: {type:String,trim:true},
  u_name: {type:String,required:true,trim:true},
  u_number: {type:String,required:true,trim:true,maxlength:10},
  u_address: {type:String,required:true,trim:true},
  u_email:{type:String,required:true,trim:true},
  u_password:{type:String,required:true},
  u_type:{type:String,required:true} 
});


// compile schema to model
module.exports = db.model('Users', usersSchema); }
catch(err){
  console.log(err)
}