const createApiResponse = require('../utils/createApiResponse.js');

const User = require('../models').User;

const createUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(409).send(createApiResponse(false, null, { email: "Email already exist!" }));
    }

    const user = await User.create({ name, email, password });
    
    return res.status(201).send(createApiResponse(true, user, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
}

const UserController = {
  createUserHandler,
};

module.exports = UserController;