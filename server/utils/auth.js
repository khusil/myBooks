// Setup JSON Web Token (JWT) authentication middleware
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
    
};


//JWT 
// A JWT consists of three parts, separated by dots (.):

// Header: Contains metadata about the token, such as the type (JWT) and the signing algorithm used.
// Payload: Contains the claims or statements about the user or entity. Claims can be predefined (standard claims) or custom-defined (private claims).
// Signature: Used to verify the integrity of the token and ensure it has not been tampered with. The signature is created using a secret key or a public/private key pair, depending on the signing algorithm used.