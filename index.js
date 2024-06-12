const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userroutes=require('./Routes/User');
const ExpRoutes=require('./Routes/Exp')
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://manu21:manu292004@cluster0.njnjb24.mongodb.net/testdb?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.log('Error connecting to MongoDB Atlas:', err);
});


app.use('/api/users', userroutes);
app.use('/api/exp',ExpRoutes)

const port = 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
