
const express = require( 'express' );
const app = express();
const expHbs = require( 'express-handlebars' );
const methodOverride = require( 'method-override' );

// Settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.engine( '.hbs', expressHandlebars( {
  defaultLayout: 'main',
  layoutsDir: path.join( app.get( 'views' ), 'layouts' ),
  partialsDir: path.join( app.get( 'views' ), 'partials' ),
  extname: '.hbs',
} ) );
app.set( 'view engine', '.hbs' );

// Middlewares Se ejecutan antes de las rutas

// Se usa para cuando te envian un formulario
app.use( express.urlencoded( { extended: false } ) );
// Para que los formularios puedan enviar otros datos como put y delete
app.use( methodOverride( '_method' ) );
// Express usará esto para guardar datos en una sesión
app.use( session( {
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
} ) );

// Global variables

// Routes
app.use( require( './routes/index' ) );
app.use( require( './routes/notes' ) );
app.use( require( './routes/users' ) );
// Static Files

// Server is listening

app.listen( app.get( 'port' ), () => {
  console.log( 'Server on port', app.get( 'port' ) );
} );

