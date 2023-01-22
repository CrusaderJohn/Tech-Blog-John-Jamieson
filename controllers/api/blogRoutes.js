const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (request, response) => {
    try {
        const newBlog = await Blog.create({
            ...request.body,
            user_id: request.session.user_id,
        });

        response.status(200).json(newBlog);
    } catch (error) {
        response.status(400).json(error);
    }
});

router.delete('/:id', withAuth, async (request, response) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: request.params.id,
                user_id: request.session.user_id,
            },
        });

        if (!blogData) {
            response.status(404).json({ message: 'No blog posts found with this id!' });
            return;
        }

        response.status(200).json(blogData);
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;
