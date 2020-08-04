var express = require('express');
var router = express.Router();
var controller = require('../controllers/orders');



/* GET users listing. */


router
  .route('/')
  .get(controller.orders)
  .post(controller.register);

  router
    .route('/:id')
    .delete(controller.delete)

  

module.exports = router;
