const jwt = require('jsonwebtoken');
// You'll need a model for your admin users
const User = require('../models/user.model'); 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin in the database
    const user = await User.findOne({ where: { email } });

    // Check if admin exists and password is correct
    if (!user || user.role !== 'admin' || (user.password !== password)) {
      return res.status(401).send({ message: "Invalid Credentials!" });
    }

   // Create a secure JWT with the correct user ID and role
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      user: { name: user.name, role: user.role },
      accessToken: token
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};