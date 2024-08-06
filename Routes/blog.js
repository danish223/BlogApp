const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');


// Get all the Blogs
router.get('/blogs', userController.getAllBlog);

// Post Blogs
router.post('/post/blogs', userController.postBlog);

// Update Blogs
router.put('/edit/:id', userController.editBlog);

// Get User By Id
router.get('/:id', userController.getById);

// Delete Blog By Id
router.delete('/:id', userController.deleteBlog);


module.exports = router;