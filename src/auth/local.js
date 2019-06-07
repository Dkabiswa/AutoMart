import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Auth = {
  createToken({ id }) {
    const expiresIn = 24 * 60 * 60;
    return jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn,
    });
  },

  verifyUser(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (header === undefined) return res.status(401).json({ 
    	status: 401, 
    	error: 'Unauthorized' 
    });

    req.user = jwt.verify(header, process.env.SECRET_KEY);
    next();
    } catch {
    return res.status(401).json({ 
    	status: 401, 
    	error: 'Invalid token!' 
    });
  }
  return false;
},

}


export default Auth;
