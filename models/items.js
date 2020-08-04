try{
const db  = require('./db'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemsSchema = db.Schema({
  i_pic: {type:String,trim:true},
  i_name: {type:String,required:true,trim:true},
  i_price: {type:String,required:true,trim:true,maxlength:10},
  i_description: {type:String,required:true,trim:true},
  i_category:{type:String,required:true,trim:true}
});


// compile schema to model
module.exports = db.model('Items', itemsSchema); }
catch(err){
  console.log(err)
}