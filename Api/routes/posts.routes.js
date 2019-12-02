const express = require('express');

const postsController = require('../controllers/posts');
const router = express.Router();

router.use(express.json());

//Get All Posts
router.get('/', postsController.getAllPosts);

//Create Post
router.post('/', postsController.createPost);

//Get Post by id
router.get('/:pid', postsController.getPostById);

//Edit Post
router.put('/', postsController.editPost);

//DELETE Post
router.delete('/:pid', postsController.deletePost);

module.exports = router;
