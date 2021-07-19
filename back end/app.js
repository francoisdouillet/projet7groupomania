const express = require('express');


//routes
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/message');

//db
const { sequelize } = require('./models/index');

const app = express();

app.use(express.json());

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

/*(async () => {
  await sequelize.sync();
  Users.create ({
    username: "1",
    password: "salut",
    email: "salut",
    createdAt: "salut",
    updatedAt: "salut"
  })
  const users = await User.findAll();
  console.log(users)
})(); */

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