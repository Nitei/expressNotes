// Para crear nuevas notas, actualizarlas, eliminarlas// Irán aquí las urls principales de la aplicación
const
  express = require( 'express' ),
  router = express.Router()
  ;

router
  .get( '/notes/add', ( req, res ) => {
    res.render( 'notes/new-note' );
  } )
  .post( '/notes/new-note', ( req, res ) => {
    console.log( req.body );
    res.send( req.body );
  } );

router
  .get( '/notes', ( req, res ) => {
    res.send( 'Notes from database' );
  } );

module.exports = router;