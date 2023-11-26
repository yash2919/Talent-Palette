const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb+srv://webd:webd@dbwebd.hvwp00i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  fullName: {
  type: String,
  required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
  type: String,
  required: true,
  }
});

app.post('/user/create', async (req, res) => {
  try {
    const { fullName,role, email, password } = req.body;

    const emailRegex = /^(?!^\s*$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    const passwordRegex = /^(?!^\s*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Invalid password format' });
    }
    const fullNameRegex = /^(?!^\s*$)[A-Za-z\s]+$/;
    if (!fullNameRegex.test(fullName)) {
      return res.status(400).json({ message: 'Full name must contain only letters and spaces.' });
    }
    const roleRegex = /^(?!^\s*$)[A-Za-z\s]+$/;
    if (!roleRegex.test(role)) {
      return res.status(400).json({ message: 'Role must contain only letters and spaces.' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      role,
      email,
      password: hashedPassword
    });
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(404).json({ message: 'User exists' });
    }

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email);
    console.log(password);
    if (!user) {
      throw new Error('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
});
app.put('/user/edit', async (req, res) => {
  try {
    const { fullName,email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if(!fullName){
      return res.status(400).json({ message: 'Full name cant be emmpty.' });
    }
    if(!password){
      return res.status(400).json({ message: 'Password cant be emmpty.' });
    }

    if (fullName) {
      const fullNameRegex = /^(?!^\s*$)[A-Za-z\s]+$/;
      if (!fullNameRegex.test(fullName)) {
        return res.status(400).json({ message: 'Full name must contain only letters and spaces.' });
      }
      user.fullName = fullName;
    }

    if (password) {

      const passwordRegex = /^(?!^\s*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Invalid password format' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    
    await user.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});


app.delete('/user/delete', async (req, res) => {
    try {
      const { email } = req.body; 

      const result = await User.deleteOne({ email });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred: ' + error.message });
    }
  });
  


app.get('/user/getAll', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName role email password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
