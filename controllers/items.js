const e = require('express');

try {
    var db = require('../models/items');
    var static = require('../static')
    const { check, validationResult } = require('express-validator');

    var validator = (req)=>{
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        var msg = {
                      "msg":errors.errors[0].msg,
                      "data":{
                                "value":errors.errors[0].value,
                                "param":errors.errors[0].param
                             }
                  };
        return msg;
      }
      else{
        return false;
      }
    }

    exports.register = (req,res)=>{
      var val = validator(req,res)
      if( val != false){
        res.send({"success":false,"status":static.status.ERROR,"message":val.msg,"data":val.data})
      }
      else{
        var content = req.body
        console.log(content)
        db.findOne({i_name: content.i_name}, function (err, docs) {
        if(docs !== null){
          res.send({"success":false,"status":static.status.ERROR,"message":'item not created',"data":{}})
           
        }
        else{
          var u_obj = new db({
            i_pic: content.i_pic,
            i_name: content.i_name,
            i_price: content.i_price,
            i_description: content.i_description,
            i_category: content.i_category
          })
          console.log(u_obj)
          u_obj.save((err,data)=>{
            if(!err){res.send({"success":true,"status":static.status.CREATED,"message":"item created successfully","data":u_obj})}
            else{
              console.log(err)
              res.send({"success":false,"status":static.status.ERROR,"message":'item not created',"data":u_obj})}
          })
        }
      })
      }
    }









    exports.update = (req,res)=>{
    
      var i_id = req.params.id;
        var content = req.body
  
        
       
            content.i_pic = 'https://aksh-api-restaurent.herokuapp.com/static/images/items/' + req.file.filename;
            db.findOneAndUpdate({_id: i_id},content,{new: true},function (err, doc) {
              if (doc === null) {
   
           res.send({"success":false,"status":static.status.ERROR,"message":"item not updated successfully","data":i_id});
   
       } else {
          res.send({"success":true,"status":static.status.OK,"message":"item updated successfully","data":doc});
   
       }
         }); }





      exports.delete = (req,res)=>{
    
        var i_id = req.params.id
        
          if(i_id){
              var crisp;
              db.findOne({_id: i_id},function (err, data) {
                if (data === null) {
            
                    crisp = [];
            
                } else {
                  
                   crisp = data;
                }
              });
              db.deleteOne({_id: i_id},function (err, doc) {
                if(doc === undefined){
                  res.send({"success":false,"status":static.status.ERROR,"message":"item not deleted","data":[]});
                }
                else{
                  if (doc.deletedCount === 0) {
      
                    res.send({"success":false,"status":static.status.ERROR,"message":"item not deleted","data":[]});
             
                } else {
                   res.send({"success":true,"status":static.status.OK,"message":"item deleted successfully","data":crisp});
             
                }
                }
                
         
      }) }}







      exports.items = (req,res)=>{
         db.find({},function(err,data){
        
          if(!err){
         res.send({"success":true,"status":static.status.OK,"message":"items listed","data":data})
          }
          else{
            res.send({"success":false,"status":static.status.ERROR,"message":"unable to get items","data":[]})
          }
        
         })}



         exports.getitem = (req,res)=>{
          var i_id = req.params.id
          db.find({_id: i_id},function(err,data){
         
           if(!err){
          res.send({"success":true,"status":static.status.OK,"message":"items listed","data":data})
           }
           else{
             res.send({"success":false,"status":static.status.ERROR,"message":"unable to get items","data":[]})
           }
         
          })}
       


}
catch(err){
    console.log(err)
  }
