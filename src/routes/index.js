// Irán aquí las urls principales de la aplicación
const
  express = require( 'express' ),
  router = express.Router()
  ;

router.get( '/', ( req, res ) => {
  // res.send( 'Index' );
  res.render( 'index' );
} );

router.get( '/about', ( req, res ) => {
  res.render( 'about' );
} );

module.exports = router;