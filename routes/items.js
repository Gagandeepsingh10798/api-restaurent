var express = require('express');
var router = express.Router();
var controller = require('../controllers/items');
var multer  = require('multer');

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./public/images/items");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({storage: Storage});


router.post('/upload',upload.single('file'),function(req, res, next) {
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: 'https://aksh-api-restaurent.herokuapp.com/static/images/items/' + req.file.filename });
})






router.put('/:id',upload.single('file'),controller.update)

router
  .route('/')
  .post(controller.register)
  .get(controller.items)
  
router
  .route('/:id') 
  .delete(controller.delete)
  .get(controller.getitem)

module.exports = router;
