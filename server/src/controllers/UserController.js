const User = require('../models/User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        errorMessage: 'An account with this email already exists.',
      });
    }

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com|@yandex.ru/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        errorMessage: 'Email is not supported from your domains.',
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        errorMessage: 'Password must be atleast 6 characters long.',
      });
    }

    const user = new User({
      name,
      email,
      password: sha256(password + process.env.SALT),
    });
    await user.save();

    res.json({
      message: `User ${name} registered successfully!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password: sha256(password + process.env.SALT),
    });

    if (!user) {
      return res.status(400).json({
        errorMesssage: 'Email or password did not match.',
      });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: 'User logged succesfully!',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};
