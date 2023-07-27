const User = require("../Model/User");
const bcrypt = require("bcrypt");
const getJwtToken = require("../Helper/GetJwtToken");
const {success} = require('../Helper/Response')
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ error: true, message: `${firstName} already exists` });
    }

    // Hash the password before saving it
    

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password, // Save the hashed password
    });
    console.log();

    return res
      .status(200)
      .json(success(`${firstName} ${lastName} is registered successfully`, { id: user._id }));
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Credentials. Please provide all required fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Credentials. Ohhh, Password is wrong" });
    }

    const token = getJwtToken({ id: user._id, Role: user.Role });
    const response = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };

    return res
      .status(200)
      .json(success(`${user.firstName} Login Successful`, response));
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};
