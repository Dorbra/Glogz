const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  path = require("path"),
  cors = require('cors'),
  PORT = process.env.PORT || 5000,
  config = require('config');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

// MongoDB setup
const db = config.get('mongoURI');
mongoose.connect(db,
  { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

// ========= ROUTES ========= //
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));


// ========== SETUP =============== //
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));