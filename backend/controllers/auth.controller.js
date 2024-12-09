import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const secretKey = "12345678Zenkai12345678";

///////////////Sign-up///////////////
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the email is already used, respond with a 400 (Bad Request) status
      return res.status(400).json({ message: "Email already used" });
    }
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, name: newUser.name },
      secretKey
    );

    return res
      .status(200)
      .json({ token, message: "User registered successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

///////////////Login///////////////
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // If the user doesn't exist or the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      secretKey
    );

    res.status(200).json({ token, message: "User Login successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
