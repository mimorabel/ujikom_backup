const jwt = require('jsonwebtoken');

function auth(role) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });

      if (role && decoded.role !== role) {
        return res.status(403).json({ message: 'Forbidden: insufficient role' });
      }

      req.user = decoded;
      next();
    });
  };
}

module.exports = auth;
