const helpers = {};

helpers.isAuthenticated = ( req, res, next ) => {
  if ( req.isAuthenticated() ) {
    return next();
  } else {
    req.flash( 'error', 'No estas autorizado' );
    res.redirect( '/users/signin' );
  }
};

module.exports = helpers;