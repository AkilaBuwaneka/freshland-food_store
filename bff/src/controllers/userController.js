const userService = require("../services/userService");

const addUser = async (req, res) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

module.exports = {
  addUser,
  getUserByEmail,
};
