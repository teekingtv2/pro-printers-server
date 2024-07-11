require('dotenv').config();
require('./db');
const express = require('express');

const websiteRouter = require('./src/routes/website/general-routes');
const generalRouter = require('./src/routes/admin/general-routes');

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
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5175',
      'https://vedca-usa.vercel.app/',
      'http://vedca-usa.vercel.app/',
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/admin-auth', adminAuthRouter);
app.use('/api/v1/admin-management', adminManagementRouter);
app.use('/api/v1/user-management', userManagementRouter);
app.use('/api/v1/general', generalRouter);
app.use('/api/website', websiteRouter);

app.get('/', (req, res) => {
  res.send('Hello, welcome to VEDCAUSA. Server is running with latest update in July 2024');
});

app.listen(process.env.APP_PORT || 7000, () => {
  connect();
  console.log(`Node version: ${process.version}`);
  // console.log(`Jest version: ${jest.version}`);
  console.log(`Listening to requests on port ${process.env.APP_PORT}`);
});
