// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const Bus = require('../models/Bus');

router.post('/signup', async (req, res) => {
  const { username, password, role, busId,latitude,longitude } = req.body;
const bus = await Bus.findOne({ busId });
    if (role === 'student'){
        if(!bus) {
          console.log("Bus not found");
          return res.status(404).json({ message: 'Bus not found' });
        }
        else{
          console.log(user.busId,"student");
    
          try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword, role, busId });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            res.status(500).json({ message: 'Error registering Student' });
          }
        }
}
  else{
     try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword, role, busId });
            await user.save();
       bus = new Bus({
        busId,
        location: { latitude, longitude },
      });
            res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            res.status(500).json({ message: 'Error registering Driver' });
          }
  }
});

router.post('/login', async (req, res) => {
    const { username, password , role, busId} = req.body;
  
        try {
      const user = await User.findOne({ username, role });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  console.log(busId, user._id, username, role);
      // For drivers, verify if the bus ID matches
      if (role === 'driver') {
        console.log(busId, user._id, "Buser Driver");
          return res.status(200).json({ message: 'Driver logged in', userId: user._id,busID:busId });
        
      }
      else if (role === 'student') {
       
          console.log(user.busId,"student");
          return res.status(200).json({ message: 'Student logged in', userId: user._id,busID:user.busId,msg:"hello"  });
          
      }
      else {
        return res.status(400).json({ message: 'Invalid role' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
