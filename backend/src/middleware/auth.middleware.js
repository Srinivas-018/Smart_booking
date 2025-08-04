const jwt = require("jsonwebtoken");

// This middleware verifies a user's token and attaches their ID and role to the request object.
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    // Attach user info to the request for the next functions to use
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

// This middleware checks if the user's role is 'admin'.
// It should always be used AFTER verifyToken.
const isAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    // If role is admin, proceed to the requested route
    next();
    return;
  }

  res.status(403).send({ message: "Require Admin Role!" });
  return;
};

// Export both middleware functions
module.exports = {
  verifyToken,
  isAdmin
};