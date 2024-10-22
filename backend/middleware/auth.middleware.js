import jwt from "jsonwebtoken";

const secretKey = "12345678Zenkai12345678";
export const authenticate = async (req, res, next) => {
  const token = await req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
