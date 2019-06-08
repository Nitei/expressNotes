const
  passport = require( 'passport' ),
  LocalStrategy = require( 'passport-local' ).Strategy,
  User = require( '../models/User' )
  ;

passport.use( new LocalStrategy( {
  usernameField: 'email'
}, async ( email, password, done ) => {
  const user = await User.findOne( { email: email } );
  if ( !user ) {
    return done( null, false, { message: 'Usuario no encontrado.' } );
  } else {
    const match = await user.matchPassword( password );
    if ( match ) {
      return done( null, user );
    } else {
      return done( null, false, { message: 'Contraseña incorrecta' } );
    }
  }
} )
);
// Si el usuario se logea, almacenamos su ID en la sesion
passport.serializeUser( ( user, done ) => {
  done( null, user.id );
} );
// Si queremos deserializarlo tomamos el ID y devolvemos el usuario
passport.deserializeUser( ( id, done ) => {
  User.findById( id, ( err, user ) => {
    done( err, user );
  } );
} );
