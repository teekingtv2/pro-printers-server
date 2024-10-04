require('dotenv').config();
require('./db');
const express = require('express');

const websiteRouter = require('./src/routes/website/general-routes');

const adminAuthRouter = require('./src/routes/admin/admin-auth-routes');
const adminManagementRouter = require('./src/routes/admin/admin-admin-routes');
const generalRouter = require('./src/routes/admin/admin-general-routes');

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
      'https://pro-printers.vercel.app',
      'http://pro-printers.vercel.app',
      'http://vedca-usa-admin.vercel.app',
      'https://vedca-usa-admin.vercel.app',
      'https://vedcausa.org',
      'http://vedcausa.org',
      'https://admin.vedcausa.org',
      'http://admin.vedcausa.org',
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/admin-auth', adminAuthRouter);
app.use('/api/v1/admin-management', adminManagementRouter);
app.use('/api/v1/general', generalRouter);
app.use('/api/website', websiteRouter);

app.get('/', (req, res) => {
  res.send(
    'Hello, welcome to Pro Printers Agency. Server is running with latest update in July 2024'
  );
});

app.listen(process.env.APP_PORT || 7000, () => {
  connect();
  setInterval(() => {
    console.log('Server is running');
  }, 600000);
  console.log(`Listening to requests on port ${process.env.APP_PORT}`);
});
