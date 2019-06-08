
const
  express = require( 'express' ),
  app = express(),
  expHbs = require( 'express-handlebars' ),
  methodOverride = require( 'method-override' ),
  path = require( 'path' ),
  session = require( 'express-session' ),
  flash = require( 'connect-flash' ),
  passport = require( 'passport' )
  ;

// Inicializaciones
require( './database' );
require( './config/passport' );

// Settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', '.hbs' );
app.engine( '.hbs', expHbs( {
  defaultLayout: 'main',
  layoutsDir: path.join( app.get( 'views' ), 'layouts' ),
  partialsDir: path.join( app.get( 'views' ), 'partials' ),
  extname: '.hbs',
} ) );

// Middlewares Se ejecutan antes de las rutas
// Se usa para cuando te envian un formulario
app.use(
  express.urlencoded( { extended: false } ),
  // Para que los formularios puedan enviar otros datos como put y delete
  methodOverride( '_method' ),
  // Express usará esto para guardar datos en una sesión
  session( {
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
  } ),
  passport.initialize(),
  passport.session(),
  flash(),
);

// Global variables
// Para guardar datos de forma local
app.use( ( req, res, next ) => {
  // Notas
  res.locals.success_created_msg = req.flash( 'success_created_msg' );
  res.locals.success_edited_msg = req.flash( 'success_edited_msg' );
  res.locals.success_deleted_msg = req.flash( 'success_deleted_msg' );
  // Error de sign up / in
  res.locals.error = req.flash( 'error' );
  next();
} );
// Routes
app.use(
  require( './routes/index' ),
  require( './routes/notes' ),
  require( './routes/users' ),
);

// Static Files define la ruta de la carpeta public
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Server is listening
app.listen( app.get( 'port' ), () => {
  console.log( 'Server on port', app.get( 'port' ) );
} );

