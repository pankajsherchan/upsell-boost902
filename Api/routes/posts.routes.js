const express = require('express');
const PostValidator = require('./validations/posts.validation');
const postsController = require('../controllers/posts');

const router = express.Router();

const postValidationSchema = require('./validations/posts.validation');

router.use(express.json());

// Get All Posts
router.get('/', postsController.getAllPosts);

// Create Post
router.post('/', PostValidator.validate, postsController.createPost);

// Get Post by id
router.get('/:pid', postsController.getPostById);

// Edit Post
router.put('/', postsController.editPost);

// DELETE Post
router.delete('/:pid', postsController.deletePost);

module.exports = router;
