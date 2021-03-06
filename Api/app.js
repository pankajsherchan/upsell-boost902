const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');
const postInfoRoutes = require('./routes/post-info.routes');
const loginRoutes = require('./routes/login.routes');
const rolesRoutes = require('./routes/roles.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const revenueRoutes = require('./routes/revenue.routes');
const performanceRoutes = require('./routes/performance.routes');
const comparisonRoutes = require('./routes/comparison.routes');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

app.use('/api/users', usersRoutes.router);
app.use('/api/posts', postsRoutes);
app.use('/api/post-info', postInfoRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/comparison', comparisonRoutes);
app.use('/api', loginRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error has occured' });
});

let url =
  'mongodb+srv://Anish99:Bh669zyG1XYxHxjO@phase2-415-n2ctl.mongodb.net/upsell-test?retryWrites=true&w=majority';

const username = 'pankajsherchan';
const password = 'test';
let url1 = `mongodb+srv://${username}:${password}@phase2-415-n2ctl.mongodb.net/upsell-test?retryWrites=true&w=majority`;
mongoose
  .connect(url1, { useNewUrlParser: true })
  .then(() =>
    app.listen(5000, () => {
      console.log(`Server is running....`);
    })
  )
  .catch(err => {
    console.log(err);
  });
