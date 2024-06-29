import jwt from "jsonwebtoken";
import { tokenBlacklist } from "./blacklist.js";

const protectedPaths = ["/profile", "/comment", "/auth/logout"];
export function jwtHandlingMiddleware(req, res, next) {
  const requestedPath = req.path;
  if (!isProtectedPath(requestedPath)) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ statusCode: 401, message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.email = decoded.email;
      next();
    } catch (err) {
      return res.status(403).json({ statusCode: 403, message: "Forbidden" });
    }
  }
  next();
}
function isProtectedPath(path) {
  return protectedPaths.some((p) => path.startsWith(p));
}
