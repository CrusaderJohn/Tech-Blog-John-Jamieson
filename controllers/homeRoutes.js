const router = require('express').Router();

router.get('/', async (request, response) => {
    response.render('homepage');
});

router.get('/login', (request, response) => {
    // If the user is already logged in, redirect the request to another route
/*    if (request.session.logged_in) {
        response.redirect('/profile');
        return;
    }*/

    response.render('login');
});

module.exports = router;