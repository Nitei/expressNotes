// Irán aquí las urls principales de la aplicación
const express = require( 'express' );
const router = express.Router();

router.get( '/', ( req, res ) => {
  res.send( 'Index' );
} );

router.get( '/about', ( req, res ) => {
  res.send( 'About' );
} );

module.exports = router;