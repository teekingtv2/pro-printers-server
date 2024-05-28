require('dotenv').config();
require('./db');
const express = require('express');

const generalRouter = require('./src/routes/admin/general-routes');

const userAuthRouter = require('./src/routes/user/user-auth-routes');
const userProfileRouter = require('./src/routes/user/user-profile-routes');

const adminAuthRouter = require('./src/routes/admin/admin-auth-routes');
const adminManagementRouter = require('./src/routes/admin/admin-admin-routes');
const userManagementRouter = require('./src/routes/admin/admin-user-routes');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connect } = require('./db');

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'https://hedge-funds-user-site.vercel.app',
      'https://hedge-funds-user-app.vercel.app',
      'https://hedge-funds-admin.vercel.app',
      'https://hedge-funds-ads-website.vercel.app',
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/user-auth', userAuthRouter);
app.use('/api/v1/user-profile', userProfileRouter);
app.use('/api/v1/admin-auth', adminAuthRouter);
app.use('/api/v1/admin-management', adminManagementRouter);
app.use('/api/v1/user-management', userManagementRouter);
app.use('/api/v1/general', generalRouter);

app.get('/', (req, res) => {
  res.send(
    'Hello, welcome to Hedge Funds app. Server is running with latest update in May 2024\n - Ad management added'
  );
});

app.listen(process.env.APP_PORT || 7000, () => {
  connect();
  console.log(`Listening to requests on port ${process.env.APP_PORT}`);
});
