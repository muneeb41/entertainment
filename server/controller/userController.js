const UserModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new UserModel({
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save the user to the database
    await newUser.save();

    // generate token
    const token = jwt.sign({ email }, process.env.SECURE_KEY);

    return res.status(201).json({
      message: "User Created Successfully",
      email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare the password using bcrypt
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign({ email }, process.env.SECURE_KEY);

    return res.status(201).json({
      message: 'Login successful',
      email,
      token,
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

    
const logout = async (req, res) => {
    try {
      return res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
      console.error("Error during logout:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };


module.exports = { signup, login, logout };
