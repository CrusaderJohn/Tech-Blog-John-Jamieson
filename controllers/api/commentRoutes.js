const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (request, response) => {
    try {
        const newComment = await Comment.create({
            ...request.body,
            user_id: request.session.user_id,
            blog_id: 1,
        });
        response.status(200).json(newComment);
    } catch (error) {
        response.status(400).json(error);
    }
});

module.exports = router;
