const { User: User_Auth } = require('../models');
const jwt_Auth = require('jsonwebtoken');

// --- Register Function ---
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // SAVING PASSWORD IN PLAINTEXT ( bcrypt hashing removed )
    await User_Auth.create({ name, email, password: password });

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// --- Login Function (with Debugging Logs) ---
exports.login = async (req, res) => {
  try {
    console.log("--- Login Attempt Received ---");
    const { email, password } = req.body;
    console.log("Attempting login for email:", email);

    const user = await User_Auth.findOne({ where: { email } });

    if (!user) {
      console.log("Result: User not found in database.");
      return res.status(404).send({ message: "User not found." });
    }

    console.log("User found. Stored password:", user.password);
    
    // This now compares the plaintext password from the request with the plaintext password in the DB
    const passwordIsValid = (user.password === password);
    console.log("Result of password comparison (should be true):", passwordIsValid);

    if (!passwordIsValid) {
      console.log("Conclusion: Invalid password.");
      return res.status(401).send({ message: "Invalid Password!" });
    }

    console.log("Conclusion: Login successful. Generating token.");
    const token = jwt_Auth.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: 86400 });
    
    res.status(200).send({ 
      user: { id: user.user_id, name: user.name, email: user.email, role: user.role }, 
      accessToken: token 
    });

  } catch (error) {
    console.log("An error occurred during login:", error);
    res.status(500).send({ message: error.message });
  }
};


// --- Get Profile Function ---
exports.getProfile = async (req, res) => {
  try {
    const user = await User_Auth.findByPk(req.userId, { 
      attributes: ['user_id', 'name', 'email', 'role'] 
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "An error occurred fetching profile." });
  }
};