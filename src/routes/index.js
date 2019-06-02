// Irán aquí las urls principales de la aplicación
const
  express = require( 'express' ),
  router = express.Router()
  ;

router.get( '/', ( req, res ) => {
  // res.send( 'Index' );
  // Para la ruta raiz usa ./index.js
  res.render( 'index' );
} );

router.get( '/about', ( req, res ) => {
  // Para la ruta raiz usa ./about.js
  res.render( 'about' );
} );

module.exports = router;