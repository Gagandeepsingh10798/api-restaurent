var express = require('express');
var router = express.Router();
var multer  = require('multer');
var controller = require('../controllers/users');



var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./public/images/users");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({storage: Storage});


/* GET users listing. */


router.post('/upload',upload.single('file'),function(req, res, next) {
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: 'http://localhost:3000/static/images/users/' + req.file.filename });
})



router
  .route('/')
  .get(controller.users)
  .post(controller.register);

  router
    .route('/:id')  
    .put(controller.update)
    .delete(controller.delete)

router
  .route('/admin')  
  .post(controller.login)
  

module.exports = router;
