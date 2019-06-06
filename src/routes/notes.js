// Para crear nuevas notas, actualizarlas, eliminarlas// Irán aquí las urls principales de la aplicación
const
  express = require( 'express' ),
  router = express.Router(),
  // importamos el modelo de notas para usar los metodos get put post y delete
  Note = require( '../models/Note' )
  ;

router
  .get( '/notes', async ( req, res ) => {
    // Esperamos a todas las notas de la DB
    const notes = await Note.find().sort( { date: 'desc' } );
    res.render( 'notes/all-notes', { notes } );
  } )
  .get( '/notes/add', ( req, res ) => {
    res.render( 'notes/new-note' );
  } )
  .post( '/notes/new-note', async ( req, res ) => {
    console.log( req.body );
    const
      { title, descripcion } = req.body,
      errors = []
      ;
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
      const newNote = new Note( { title, descripcion } );
      await newNote.save();
      res.redirect( '/notes' );
    }

  } );

router
  .get( '/notes/edit/:id', async ( req, res ) => {
    const note = await Note.findById( req.params.id );
    res.render( 'notes/edit-note', { note } );
  } )
  .put( '/notes/edit-note/:id', async ( req, res ) => {
    const { title, descripcion } = req.body;
    await Note.findByIdAndUpdate( req.params.id, { title, descripcion } );
    res.redirect( '/notes' );
  } )
  .delete( '/notes/delete/:id', ( req, res ) => {

  } );

module.exports = router;

// Para eliminar toda la base de datos en la mongo shell:
// show dbs  //  Mostrará todas las bases de datos de mongo
// use randomNameDatabase
// db.dropDatabase()