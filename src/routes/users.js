// Irán aquí las urls principales de la aplicación
const express = require( 'express' );
const router = express.Router();

router.get( '/users/signin', ( req, res ) => {
  // res.send( 'Ingresando a la aplicación' );
  res.render( 'users/signin.hbs' );
} );

router.get( '/users/signup', ( req, res ) => {
  // res.send( 'Formulario de authenticación' );
  res.render( 'users/signup.hbs' );
} );

module.exports = router;