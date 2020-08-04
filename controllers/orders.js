try {
    const Bcrypt = require("bcryptjs");
    var db = require('../models/orders');
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
          var u_obj = new db({
            u_name: content.name,
            u_address: content.address,
            u_email: content.email,
            payment: content.payment,
            bill : content.total,
            products: content.products
          })
          console.log(u_obj)
          u_obj.save((err,data)=>{
            if(!err){res.send({"success":true,"status":static.status.CREATED,"message":'order successfull',"data":u_obj})}
            else{
              console.log(err)
              res.send({"success":false,"status":static.status.ERROR,"message":'order not successfull',"data":u_obj})}
          })
      }
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
      
             res.send({"success":false,"status":static.status.ERROR,"message":"order not deleted","data":[]});
      
         } else {
            res.send({"success":true,"status":static.status.OK,"message":"order deleted","data":crisp});
      
         }
         
      }) }}







      exports.orders = (req,res)=>{
         db.find({},function(err,data){
        
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
