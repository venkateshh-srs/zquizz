import jwt from "jsonwebtoken";
function userAuthenticate(req, res, next) {
  const token = req.cookies?.jwt;
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  } else {
    jwt.verify(token, process.env.JWT_USER_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: "Token is in-valid" });
      } else next();
    });
  }
}
export default userAuthenticate;
