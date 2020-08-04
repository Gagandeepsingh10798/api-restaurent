try{
    const db  = require('./db'); 
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    var ordersSchema = db.Schema({
      u_name: {type:String,required:true,trim:true},
      u_address: {type:String,required:true,trim:true},
      u_email:{type:String,required:true,trim:true},
      payment:{type:String,required:true},
      bill:{type:Number,required:true},
      products:{type:String,required:true}
    });
    
    
    // compile schema to model
    module.exports = db.model('Orders', ordersSchema); }
    catch(err){
      console.log(err)
    }