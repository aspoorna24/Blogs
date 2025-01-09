const express = require('express')
const blogController = require('../controllers/blogContoller');
const router = express.Router();

router.get("/create",blogController.blog_create_post);
  
router.get('/', blogController.blog_index);
  
router.post('/',blogController.blog_details)
  
router.get('/:id',blogController.blog_create_get)
  
router.delete('/:id',blogController.blog_delete);
  

module.exports = router;