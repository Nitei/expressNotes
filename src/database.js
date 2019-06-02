const express = require( 'express' );
const mongoose = require( 'mongoose' );

// Esto permite conectarte a una dirección de internet
// Si la base de datos no existe mongoose la creará por nosotros
mongoose.connect( 'mongodb://localhost/notes-db-app', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
} )
  .then( ( db ) => console.log( 'DB está conectada' ) )
  .catch( ( err ) => console.error( err ) );