const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Winter24', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Create a schema for your data
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: String
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

// Serving the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// Handling form submission
app.post('/', async (req, res) => {
  // Get the data from the form
  const { myuri } = req.body;

  // Create a new student document
  const newStudent = new Student({
    name: "Hsia, Ting-Nan",
    studentID: "300369601"
  });

  try {
    // Save the new student document to the database
    await newStudent.save();
    res.send(`<h1>Document Added</h1>`);
  } catch (err) {
    console.error('Error saving document:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
