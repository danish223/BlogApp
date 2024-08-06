const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

// Get all the Blogs
router.get('/blogs',isAuth, userController.getAllBlog);

// Post Blogs
router.post('/post/blogs',isAuth, userController.postBlog);

// Update Blogs
router.put('/edit/:id',isAuth, userController.editBlog);

// Get User By Id
router.get('/:id',isAuth, userController.getById);

// Delete Blog By Id
router.delete('/:id',isAuth, userController.deleteBlog);


module.exports = router;