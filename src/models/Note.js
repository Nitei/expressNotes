// Los Schemas son clases y se usan como interfaces

const
  mongoose = require( 'mongoose' ),
  { Schema } = mongoose,
  NoteSchema = new Schema( {
    title: { type: String, required: true },
    descripcion: { type: String, required: true },
    date: { type: Date, default: Date.now }
  } )
  ;

module.exports = mongoose.model( 'Note', NoteSchema );