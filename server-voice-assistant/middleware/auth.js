const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(
      token,
      "djfnsdjhfeuur84Fu48u5njnfu4u48unjg8t84u"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
