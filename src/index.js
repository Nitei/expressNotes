
const express = require( 'express' );
const expHbs = require( 'express-handlebars' );
const methodOverride = require( 'method-override' );
const path = require( 'path' );
const session = require( 'express-session' );

// Inicializaciones
const app = express();
require( './database' );

// Settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.engine( '.hbs', expHbs( {
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
// Defino la ruta de la carpeta public
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Server is listening

app.listen( app.get( 'port' ), () => {
  console.log( 'Server on port', app.get( 'port' ) );
} );

