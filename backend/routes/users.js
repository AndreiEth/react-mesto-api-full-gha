const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUser,
} = require('../controllers/users');

const {
  updateUserValidation,
  validationUpdateAvatar,
  userIdValidation,
} = require('../middlewares/validation');

userRoutes.get('/', getUsers);
userRoutes.get('/getuser/:userId', userIdValidation, getUserById);
userRoutes.patch('/me', updateUserValidation, updateUser);
userRoutes.patch('/me/avatar', validationUpdateAvatar, updateAvatar);
userRoutes.get('/me', getUser);

module.exports = userRoutes;
