const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user_schema');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/auth');
const blacklist = new Set();
// const
const {
  createData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const router = express.Router();

// Signup routes
router
  .post('/signup', createData, (req, res) =>{
    try{
      res.status(200);
    }
      catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
  });


// Login routes
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Profile routes
router.get('/user/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).json({ full_name : user.full_name ,username : user.username, userId: user._id });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/logout', (req, res) => {
  const token = req.body.token;
  console.log(token)
  if (token) {
    // Add the token to the blacklist
    blacklist.add(token);
    res.send('done');
    return res.sendStatus(204);

  }
  res.sendStatus(400);
});


module.exports = router;
