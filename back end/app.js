const express = require('express');

//routes
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/message');

//db
const { sequelize } = require('./models/index');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

(async () => {
  await sequelize.sync()
  sequelize.USER.create({
    email: "req.body.email",
    username: "req.body.username",
    password: "req.body.password",
  })
  const users = await Users.findAll()
  console.log(users)
})


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