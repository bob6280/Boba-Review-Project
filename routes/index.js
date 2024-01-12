var express = require('express');
var router = express.Router();
const passport = require("passport");
const cookieSession = require('cookie-session');
require('../passport')

const app = express();

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const reviewSchema = new Schema({ userName: String, userEmail: String, beverageName: String, beverageType: String, img: { data: Buffer }, rating: Number, review: String}, {collection: 'beverage_review'});
const BeverageModel = mongoose.model('beverage_review', reviewSchema );
const beverageTypeSchema = new Schema({ name: String , type: String}, {collection: 'beverages'});
const BeverageTypeModel = mongoose.model('beverages', beverageTypeSchema );

var fs = require('fs');
var path = require('path');
var multer = require('multer');
var cors =require("cors");
app.use(cors());

/**
 * Set the prototype of template storage for image
 *
 * @type {DiskStorage} the prototype of template storage
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + "-"+ file.filename);
  },
});

/**
 * Initialize the server storage
 *
 * @type {Multer} the object of server storage setting
 */
const upload = multer({
  storage: storage
});

/**
 * Extract user information from http request
 *
 * @param req the request information from brower
 * @returns {{user_email, user_id, current_user_name: *}} An object including user id, user name and user email
 */
function isLoggedIn(req) {
  let current_user_info;
  if (req.user) {
    current_user_info = {
      user_id: req.user.id,
      user_email: req.user.emails[0].value,
      current_user_name: req.user.displayName
    };
  }
  return current_user_info;
}

/**
 * Extract all the beverage name and type from MongoDB
 *
 * @returns {Promise<Map<any, any>>} all the beverage name and type
 */
async function getBeverages() {
  let beverageData = new Map();
  let allBeverages = await BeverageTypeModel.find();
  for (const doc of allBeverages) {
    const record = doc.toObject();
    const beverageName = record.name;
    const beverageType = record.type;
    if (beverageData.has(beverageType)) {
      const nameTmp = beverageData.get(beverageType);
      nameTmp.push(beverageName);
    } else {
      const nameTmp = [ beverageName ];
      beverageData.set(beverageType, nameTmp);
    }
  }
  return beverageData;
}

/**
 *  GET home page.
 *  This is the landing page.
 *  */
router.get('/', async function(req, res, next) {
  let beverageData = await getBeverages();

  let reviewsData = [];
  let allReviewsRecords;
  allReviewsRecords = await BeverageModel.find().sort({$natural:-1}).limit(20);
  let curRating = 0;
  for (const doc of allReviewsRecords) {
    const record = doc.toObject();
    reviewsData.push({
      reviewId: record._id.valueOf(),
      userName: record.userName,
      userEmail: record.userEmail,
      beverageName: record.beverageName,
      beverageType: record.beverageType,
      img: record.img.data,
      rating: record.rating,
      review: record.review
    });
    curRating += record.rating;
  }
  curRating = curRating / allReviewsRecords.length ;
  const current_user_info = isLoggedIn(req);
  res.cookie('current_user_info', current_user_info, { maxAge: 900000, httpOnly: false});
  let current_user_name = "";
  if (current_user_info && 'current_user_name' in current_user_info) {
    current_user_name = current_user_info.current_user_name;
  }
  res.render('index', { title: "Home Page" , user: current_user_name, filter_type: "all type", average_rating: curRating.toFixed(2), reviews: reviewsData, beverages: Object.fromEntries(beverageData) });
});

/**
 *  POST home page.
 *  The result filtered by beverage type will show up on the home page.
 *  */
router.post('/', async function(req, res, next) {
  let beverageData = await getBeverages();

  let reviewsData = [];
  const filterType = req.body.beverage_type;
  let allReviewsRecords;
  if (filterType === undefined || filterType === 'all') {
    allReviewsRecords = await BeverageModel.find().sort({$natural:-1}).limit(20);
  } else {
    allReviewsRecords = await BeverageModel.find({"beverageType": filterType}).sort({$natural:-1}).limit(20);
  }
  let curRating = 0;
  for (const doc of allReviewsRecords) {
    const record = doc.toObject();
    reviewsData.push({
      reviewId: record._id.valueOf(),
      userName: record.userName,
      userEmail: record.userEmail,
      beverageName: record.beverageName,
      beverageType: record.beverageType,
      img: record.img.data,
      rating: record.rating,
      review: record.review
    });
    curRating += record.rating;
  }
  curRating = curRating / allReviewsRecords.length;
  const current_user_info = isLoggedIn(req);
  res.cookie('current_user_info', current_user_info, { maxAge: 900000, httpOnly: false});
  let current_user_name = "";
  if (current_user_info && 'current_user_name' in current_user_info) {
    current_user_name = current_user_info.current_user_name;
  }
  res.render('index', { title: "Home Page" , user: current_user_name, filter_type: filterType, average_rating: curRating.toFixed(2), reviews: reviewsData, beverages: Object.fromEntries(beverageData) });
});

/**
 *  GET edit page.
 *  Link to edit page.
 *  */
router.get('/edit', async function(req, res, next) {
  let beverageData = await getBeverages();
  res.render('edit', { title: "Review Page" , beverages: Object.fromEntries(beverageData) });
});

/**
 *  POST edit page.
 *  Submit review content to MongoDB, and jump back to home page.
 *  */
router.post('/edit', upload.single('beverage_img'), function(req, res, next) {
  const { user_name, user_email, beverage_name, beverage_type, beverage_img, beverage_rate, review_text } = req.body;

  let filename = "default.png";
  if (req.file) {
    filename = req.file.filename;
  }
  const imgFile = __dirname + '/uploads/' + filename;
  try {
    const data = new BeverageModel({
      userName: user_name,
      userEmail: user_email,
      beverageName: beverage_name,
      beverageType: beverage_type,
      img: {
        data: fs.readFileSync(path.join(imgFile)),
      },
      rating: beverage_rate,
      review: review_text
    });
    data.save();
    if (req.file) {
      fs.unlinkSync(imgFile);
    }
  } catch (err) {
    console.error(err);
  }
  res.redirect('/');
  res.render('index', { title: "Home Page" });
});

/**
 *  POST display page.
 *  Link to display page.
 *  */
router.post('/display', async function(req, res, next) {
  const { current_user_name, current_user_email, user_name, user_email, review_id, beverage_name, beverage_type, beverage_img, beverage_rate, beverage_text } = req.body;
  let beverageData = await getBeverages();
  let displayContent = {
    current_user_name: current_user_name,
    current_user_email: current_user_email,
    user_name: user_name,
    user_email: user_email,
    review_id: review_id,
    beverage_name: beverage_name,
    beverage_type: beverage_type,
    beverage_img: beverage_img,
    beverage_rate: beverage_rate,
    beverage_review_text: beverage_text
  };
  res.render('display', { title: "Display Page" , beverages: Object.fromEntries(beverageData), displayContent: displayContent  });
});

/**
 *  GET modify page.
 *  Update modified review content and jump back to home page.
 *  */
router.post('/modify', upload.single('beverage_img'), async function(req, res, next) {
  const { user_name, user_email, review_id, beverage_name, beverage_type, beverage_img, beverage_rate, review_text } = req.body;
  let filename = "default.png";
  if (req.file) {
    filename = req.file.filename;
  }
  const imgFile = __dirname + '/uploads/' + filename;
  const data = {
    userName: user_name,
    userEmail: user_email,
    beverageName: beverage_name,
    beverageType: beverage_type,
    img: {
      data: fs.readFileSync(path.join(imgFile)),
    },
    rating: beverage_rate,
    review: review_text
  };
  try {
    await BeverageModel.findByIdAndUpdate({ _id: review_id }, data);
    if (req.file) {
      fs.unlinkSync(imgFile);
    }
  } catch (err) {
    console.error(err);
    // return res.status(500).json({ error: 'An error occurred while saving the data' });
  }
  res.redirect('/');
  res.render('index', { title: "Home Page" });
});

module.exports = router;
