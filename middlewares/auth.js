import jwt from "jsonwebtoken";

const protectedPaths = ["/profile", "/comment"];
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" "[1]);
  if (token && isProtectedPath(token)) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    next();
  }
}
function isProtectedPath(path) {
  return protectedPaths.some((p) => path.startsWith(p));
}
