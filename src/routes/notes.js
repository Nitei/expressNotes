// Para crear nuevas notas, actualizarlas, eliminarlas// Irán aquí las urls principales de la aplicación
const
  express = require( 'express' ),
  router = express.Router(),
  // importamos el modelo de notas para usar los metodos get put post y delete
  Note = require( '../models/Note' ),
  { isAuthenticated } = require( '../helpers/auth' )
  ;

router
  .get( '/notes', isAuthenticated, async ( req, res ) => {
    // Esperamos a todas las notas de la DB
    // Note.find( { user: req.user.id } ); // Busca en la DB las notas desean de éste usuario
    const notes = await Note.find( { user: req.user.id } ).sort( { date: 'desc' } );
    res.render( 'notes/all-notes', { notes } );
  } )
  .get( '/notes/add', isAuthenticated, ( req, res ) => {
    res.render( 'notes/new-note' );
  } )
  .get( '/notes/edit/:id', isAuthenticated, async ( req, res ) => {
    const note = await Note.findById( req.params.id );
    res.render( 'notes/edit-note', { note } );
  } )
  .post( '/notes/new-note', isAuthenticated, async ( req, res ) => {
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
    if ( errors.length > 0 ) {
      res.render( 'notes/new-note', {
        errors,
        title,
        descripcion
      } );
    } else {
      const newNote = new Note( { title, descripcion } );
      newNote.user = req.user.id;
      await newNote.save();
      req.flash( 'success_created_msg', 'Nota agregada satisfactoriamente' );
      res.redirect( '/notes' );
    }
  } )
  .put( '/notes/edit-note/:id', isAuthenticated, async ( req, res ) => {
    const { title, descripcion } = req.body;
    await Note.findByIdAndUpdate( req.params.id, { title, descripcion } );
    // La variable global success_msg contendrá la nota actualizada satisfactoriamente
    req.flash( 'success_edited_msg', 'Nota actualizada satisfactoriamente' );
    res.redirect( '/notes' );
  } )
  .delete( '/notes/delete/:id', isAuthenticated, async ( req, res ) => {
    await Note.findByIdAndDelete( req.params.id );
    req.flash( 'success_deleted_msg', 'Nota eliminada satisfactoriamente' );
    res.redirect( '/notes' );
  } );

module.exports = router;

// Para eliminar toda la base de datos en la mongo shell:
// show dbs  //  Mostrará todas las bases de datos de mongo
// use randomNameDatabase
// db.dropDatabase()