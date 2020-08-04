try {
    const Bcrypt = require("bcryptjs");
    var db = require('../models/users');
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
        db.findOne({u_email: content.email}, function (err, docs) {
        if(docs !== null){
          res.send({"success":false,"status":static.status.ERROR,"message":static.message.auth.register[400],"data":{}})
           
        }
        else{
          var u_obj = new db({
            u_pic: content.pic,
            u_name: content.name,
            u_number: content.number,
            u_address: content.address,
            u_email: content.email,
            u_password: Bcrypt.hashSync(content.password, 10),
            u_type : content.type
          })
          console.log(u_obj)
          u_obj.save((err,data)=>{
            if(!err){res.send({"success":true,"status":static.status.CREATED,"message":static.message.auth.register[201],"data":u_obj})}
            else{
              console.log(err)
              res.send({"success":false,"status":static.status.ERROR,"message":'registration not successfull',"data":u_obj})}
          })
        }
      })
      }
    }







    exports.login = (req,res)=>{
      console.log(req.body)
      var content = req.body
      db.findOne({u_email: content.u_email}, function (err, docs) {
        if(docs === null){
          res.send({"success":false,"status":static.status.ERROR,"message":static.message.auth.login[400],"data":content})
        }
        else{
          if(!Bcrypt.compareSync(content.u_password, docs.u_password)){
            res.send({"success":false,"status":static.status.ERROR,"message":static.message.auth.login[400],"data":content})
           
          }
          else{
            res.send({"success":true,"status":static.status.OK,"message":static.message.auth.login[200],"data":content})
          }
         
        }
      })
    
    }









    exports.update = (req,res)=>{
    
      var u_id = req.params.id;
        var content = req.body
        content.u_password = Bcrypt.hashSync(content.u_password, 10)
        db.find({ u_email: content.email },function(err,data){
        
          if(data.length == 0){
            
            db.findOneAndUpdate({_id: u_id},content,{new: true},function (err, doc) {
              if (doc === null) {
   
           res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.update[400],"data":u_id});
   
       } else {
          res.send({"success":true,"status":static.status.OK,"message":static.message.user.update[200],"data":doc});
   
       }
         });
           
          }
          else{
            
  
            res.send({"success":false,"status":static.status.ERROR,"message":'email already exist ',"data":data})
            
    
          }
        
         })
        
      }





      exports.delete = (req,res)=>{
    
        var u_id = req.params.id
        
          if(u_id){
              var crisp;
              db.findOne({_id: u_id},function (err, data) {
                if (data === null) {
            
                    crisp = [];
            
                } else {
                  
                   crisp = data;
                }
              });
              db.deleteOne({_id: u_id},function (err, doc) {
                if (doc.deletedCount === 0) {
      
             res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.delete[400],"data":[]});
      
         } else {
            res.send({"success":true,"status":static.status.OK,"message":static.message.user.delete[200],"data":crisp});
      
         }
         
      }) }}







      exports.users = (req,res)=>{
         db.find({u_type: "user"},function(err,data){
        
          if(!err){
         res.send({"success":true,"status":static.status.OK,"message":static.message.user.get_all[200],"data":data})
          }
          else{
            res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.get_all[400],"data":[]})
          }
        
         })}
       


}
catch(err){
    console.log(err)
  }
