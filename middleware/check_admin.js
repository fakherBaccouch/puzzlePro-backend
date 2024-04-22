const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "No token provided."
      });
    }  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Check if the role of the decoded token is 'admin'
      if (decoded.role !== 'admin') {
        console.log(decoded)
        return res.status(403).json({
          error: true,
          message: "Access denied. Admins only."
        });
   }

      req.verified = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(403).json({
          error: true,
          message: error.message,
          expiredToken: token,
        });
      } else {
        res.status(401).json({
          error: true,
          message: error.message,
        });
      }
    }
  } catch (e) {
    res.status(res.statusCode || 500).json({
      error: true,
      message: e.message,
    });
  }
};