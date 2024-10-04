const multer = require('multer');
const path = require('path');

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/imgs/projects');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/[^a-zA-Z0-9_.,]/g, '') +
        '_' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const proUpload = multer({ storage: projectStorage });
const projectImageUpload = proUpload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'images', maxCount: 30 },
]);

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/imgs/posts');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/[^a-zA-Z0-9_.,]/g, '') +
        '_' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const postUpload = multer({ storage: postStorage });
const postImageUpload = postUpload.fields([{ name: 'cover', maxCount: 1 }]);

const quoteRequestStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/imgs/quote-requests');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/[^a-zA-Z0-9_.,]/g, '') +
        '_' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const quoteRequestUpload = multer({ storage: quoteRequestStorage });
const quoteRequestImageUpload = quoteRequestUpload.fields([{ name: 'doc', maxCount: 1 }]);

// Admin avatar
const adminStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/imgs/admins');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/[^a-zA-Z0-9_.,]/g, '') +
        '_' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const adminUpload = multer({ storage: adminStorage });
const adminImageUpload = adminUpload.fields([{ name: 'avatar', maxCount: 1 }]);

module.exports = {
  projectImageUpload,
  postImageUpload,
  quoteRequestImageUpload,
  adminImageUpload,
};
