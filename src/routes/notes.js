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
    const { title, descripcion } = req.body;
    const errors = [];
    if ( !title ) {
      errors.push( { text: 'Por favor escriba un título' } );
    }
    if ( !descripcion ) {
      errors.push( { text: 'Por favor escriba un descripcion' } );
    }
    if ( errors.length ) {
      res.render( 'notes/new-note', {
        errors,
        title,
        descripcion
      } );
    } else {
      res.send( 'ok' );
    }
  } );


router
  .get( '/notes', ( req, res ) => {
    res.send( 'Notes from database' );
  } );

module.exports = router;