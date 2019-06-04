import jwt from 'jsonwebtoken';

require('dotenv').config();

const Auth = {
  createToken(id) {
    const  expiresIn  =  24  *  60  *  60;
    return jwt.sign({ id:  id }, process.env.SECRET_KEY, {
    expiresIn:  expiresIn
    });
  },

  verifyToken() {

  },

};
export default Auth;
