const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require("path");


//routes
const userRoutes = require('./routes/user.js');
const postsRoutes = require('./routes/message');

//db
const { sequelize } = require('./models/index');

const app = express();

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}))

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

module.exports = app;