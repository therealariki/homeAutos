var express = require('express');
var garageController = require('../control/garageController');
var router = express.Router();``
var DAO = require('../control/houseDAO');
var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}
module.exports = function (passport) {
    /* GET login page. */
    router.get('/', function (req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', {message: req.flash('loginMessage')});
    });
    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/house',
        failureRedirect: '/',
        failureFlash: true
    }));
    /* GET Registration Page */
    router.get('/signup', isAuthenticated, function (req, res) {
        res.render('register', {message: req.flash('signupMessage'), okMessage: req.flash('successMessage')});
    });
    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/house',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    /* Handle Facebook Auth & Login */
    router.get('/login/facebook', passport.authenticate('facebook', {scope: 'email'}));
    /* Handle Facebook Callback */
    router.get('/login/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/house',
        failureRedirect: '/'
    }));
    // route for twitter authentication and login
    // different scopes while logging in
    router.get('/login/twitter',
        passport.authenticate('twitter'));
    // handle the callback after facebook has authenticated the user
    router.get('/login/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/house',
            failureRedirect: '/'
        })
    );
    router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    // the callback after google has authenticated the user
    router.get('/login/google/callback', passport.authenticate('google', {
        successRedirect: '/house',
        failureRedirect: '/'
    }));
    /* GET House View Page */
    router.get('/house', isAuthenticated, function (req, res, next) {
        res.render('house', {
            initialStates: DAO.asyncGetStates,
            dist: garageController.getDoorStateAndDistanceFrom().dist,
            state: garageController.getDoorStateAndDistanceFrom().state,
            user: req.user
        });
    });
    /* GET Garage View Page */
    router.get('/garage', isAuthenticated, function (req, res, next) {
        res.render('garage', {
            dist: garageController.getDoorStateAndDistanceFrom().dist,
            state: garageController.getDoorStateAndDistanceFrom().state
        });
    });
    return router;
}
router.get('/test', function (req, res, next) {
    res.render('test', {initialStates: DAO.asyncGetStates});
});

router.get('/stattest', isAuthenticated, function (req, res, next) {
    res.render('stattest', {initialStates: DAO.getStates});
});