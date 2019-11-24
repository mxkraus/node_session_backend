const User = require('../models/user');
const Community = require('../models/community');

const bcrypt = require('bcryptjs');

/**
 * Signup Formular laden
 * 
 */
exports.getSignup = (req, res, next) => {
    Community.getAll()
        .then(([rows, fieldData]) => {
            res.render('auth/signup', {
                comms: rows,
                pageTitle: 'Registrieren',
                path: '/signup',
                role: req.session.loggedRole,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
}

/**
 * Signup-Daten senden
 * 
 */
exports.postSignup = (req, res, next) => {
    // Neuen User in Datenbank speichern

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.signupEmail;
    const password = req.body.signupPass;
    const passwordConfirmed = req.body.signupPassConfirm;
    const community = req.body.signupComm;

    // Validate User Inputs !!!

    User.getByEmail(email)
        .then(([rows, fieldData]) => {
            if (rows.length > 0) {
                // User mit gleicher Email gefunden!
                res.redirect('/signup');
                console.log('Dieser User existiert schon');
            }
            return bcrypt
                .hash(password, 8)
                .then(hashedPassoword => {
                    const user = new User(null, firstName, lastName, email, hashedPassoword, community, 0);
                    user.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
        })
        .catch(err => {
            err => console.log(err)
        });
}

/**
 * Login Formular laden
 * 
 */
exports.getLogin = (req, res, next) => {
    console.log('Session: ' + req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login Backend',
        path: '/login',
        role: 'user',
        isAuthenticated: req.session.isLoggedIn
    });
}

/**
 * Login-Daten senden
 * 
 */
exports.postLogin = (req, res, next) => {

    const email = req.body.loginEmail;
    const pass = req.body.loginPassword;
    const adminRoute = req.body.adminRole;

    User.getByEmail(email)
        .then(([user, fieldData]) => {
            console.log(user);
            if (user.length == 0) {
                return res.redirect('/login');
            }
            bcrypt
                .compare(pass, user[0].password)
                .then(doMatch => {
                    if (doMatch) {

                        req.session.user = user[0];

                        if (adminRoute) {

                            if ( user[0].isadmin == true ) {
                                req.session.adminLoggedIn = true;
                                req.session.loggedRole = 'admin';
                                return req.session.save(err => {
                                    console.log(err);
                                    res.redirect('/admin/dashboard');
                                })
                            } else {
                                console.log('Keine Admin Rechte!')
                                res.redirect('/');
                            }

                        } else {

                            req.session.isLoggedIn = true;
                            req.session.loggedRole = 'user';
                            return req.session.save(err => {
                                console.log(err);
                                res.redirect('/manage-site');
                            })

                        }

                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });

        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Logout
 * 
 */
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}