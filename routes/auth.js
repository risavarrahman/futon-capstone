const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

// Register Router
router.post('/register', async (req, res) => {
  // Validasi Data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check apakah user ada di Database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist!');

  // Hashing Password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    res.send({ user: user._id });
    // const savedUser = await user.save();
    // res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login Router
router.post('/login', async (req, res) => {
  // Validasi Data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check apakah user ada di Database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email doesnt exist!');

  // Checking Password is Correct
  const truePassword = await bcrypt.compare(req.body.password, user.password);
  if (!truePassword) return res.status(400).send('Invalid Password');

  // Create and Assign a Token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header('auth-token', token).send(token);
});

module.exports = router;
