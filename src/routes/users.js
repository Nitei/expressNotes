// Irán aquí las urls principales de la aplicación
const
  express = require( 'express' ),
  router = express.Router(),
  User = require( '../models/User' ),
  passport = require( 'passport' )
  ;

// SIGN IN
router
  .get( '/users/signin', ( req, res ) => {
    // res.send( 'Ingresando a la aplicación' );
    res.render( 'users/signin' );
  } )
  .post( '/users/signin', passport.authenticate( 'local', {
    // Si el usuario se autentica correctamente es redirigido a /notes
    successRedirect: '/notes',
    // Si el usuario se autentica incorrectamente es redirigido a /users/signin
    failureRedirect: '/users/signin',
    // Esto es para poder enviar mensajes flash
    failureFlash: true
  } ) )
  ;

// SIGN UP
router
  .get( '/users/signup', ( req, res ) => {
    // res.send( 'Formulario de authenticación' );
    res.render( 'users/signup.hbs' );
  } )
  .post( '/users/signup', async ( req, res ) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if ( password !== confirm_password ) {
      errors.push( { text: 'Las contraseñas deben ser iguales' } );
    }
    if ( password.length < 4 ) {
      errors.push( { text: 'La contraseña debería tener mínimo 4 caracteres' } );
    }
    if ( errors.length ) {
      res.render( 'users/signup', { errors, name, email, password, confirm_password } );
    } else {
      const emailUserAlreadyExist = await User.findOne( { email: email } );
      if ( emailUserAlreadyExist ) {
        req.flash( 'success_deleted_msg', 'El email ya está registrado' );
        res.redirect( '/users/signup' );
      } else {
        const newUser = new User( { name, email, password, confirm_password } );
        newUser.password = await newUser.encryptPassword( password );
        await newUser.save();
        req.flash( 'success_created_msg', 'Estas registrado' );
        res.redirect( '/users/signin' );
      }
    }
  } )
  ;
router.get( '/users/logout', ( req, res ) => {
  req.logOut();
  res.redirect( '/' );
} );

module.exports = router;