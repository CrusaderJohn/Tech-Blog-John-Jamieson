const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (request, response) => {
    try {
        // Get all projects and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        response.render('homepage', {
            blogs,
            logged_in: request.session.logged_in
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get('/blog/:id', async (request, response) => {
    try {
        const blogData = await Blog.findByPk(request.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        response.render('blog', {
            ...blog,
            logged_in: request.session.logged_in
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (request, response) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(request.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        response.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get('/login', (request, response) => {
    // If the user is already logged in, redirect the request to another route
    if (request.session.logged_in) {
        response.redirect('/dashboard');
        return;
    }

    response.render('login');
});

module.exports = router;