import jwt from "jsonwebtoken";
function authenticate(req, res, next) {
  const token = req.cookies?.adminJwt;
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: "Token is in-valid" });
      } else next();
    });
  }
}
export default authenticate;
