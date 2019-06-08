const
  mongoose = require( 'mongoose' ),
  { Schema } = mongoose,
  bcrypt = require( 'bcryptjs' )
  ;
// Modelo del UserSchema
const UserSchema = new Schema( {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String, required: true },
  date: { type: Date, default: Date.now }
} );
// Esperamos a que se encripte la contraseña
UserSchema.methods.encryptPassword = async ( password ) => {
  const salt = await bcrypt.genSalt( 10 );
  const hash = bcrypt.hash( password, salt );
  return hash;
};
// Compraramos las contraseñas encriptadas
UserSchema.methods.matchPassword = async function ( password ) {
  return await bcrypt.compare( password, this.password );
};
// Retornamos el módulo
module.exports = mongoose.model( 'User', UserSchema );