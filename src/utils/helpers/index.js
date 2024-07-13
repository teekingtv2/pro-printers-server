const crypto = require('crypto');

exports.sendError = (res, error, status = 206) => {
  res.status(status).json({ success: false, error });
};
exports.badRequestError = (res, error, status = 400) => {
  res.status(status).json({ success: false, error });
};
exports.sendLoginError = (res, error, loginStatus = 0, status = 206) => {
  res.status(status).json({ success: false, loginStatus, error });
};
exports.sendSuccess = (res, message, data = null, status = 200) => {
  res.status(status).json({ success: true, message, data });
};

exports.createRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const token = buff.toString('hex');
      resolve(token);
    });
  });

exports.generateOTP = () => {
  let otp = '';
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};

exports.formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });
};

exports.generateSlug = (title) => {
  const sanitisedTitle = title.replace(
    /[\\\.\,\+\*\?\^\$\@\#\%\^\&\*\-\_\[\]\(\)\{\}\/\'\#\:\!\=\|]/gi,
    ''
  );
  const slug = sanitisedTitle.split(' ').join('-');
  return slug;
};
