const jwt = require("jsonwebtoken")

const JWT_SECRET = "TOP_SECRET";
const authorizedMiddleware = (req, res, next) => {

  // console.log('aUTORIZATION TOKEN', req.headers)//
  
  const authorizationToken = req.headers['authorization'] || "";
  const token = authorizationToken.replace("Bearer ", "")
  // console.log('log la request din middleware', req);
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
  
        // console.log('LOG_LA_DECODED', decoded);//
  
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = authorizedMiddleware;
