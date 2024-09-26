const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
// just make it consistent lol
const db = require('../libs/db');

// lazy zoon
USER_EMAIL_QUERY_ERROR = "SUCCESFULLY FAILED query user email"
USER_EMAIL_EXISTS = "Failed to create user, email already registered"


router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

// I should warp check-email-exist as middle ware, spare me I am too tired now, sorry.
router.post('/createUserInfo', (req, res) => {
  // console.log(userInfo);
  const userInfo = req.body;
  const userEmail = userInfo.email;

  // check if email exists
  db.findOne({ email: userEmail}, (err, doc) => {

    if (err) {
      //status(400)
      return res.json({message: USER_EMAIL_QUERY_ERROR})
    }

    if (doc) {
      // user email exists
      // status(500) 
      return res.json({message: USER_EMAIL_EXISTS})
    }

    else{
      // insert new user info
      db.insert(userInfo, (err, newDoc) => {
        if (err) {
          res.status(500).json({message: "Not able to save user infomation"})
        }else{
          res.json({
            message: 'Created user info! Thanks for using me!'
          })
        }
      })
    }
  })
})

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet! and goodbye as well.',
  }),
);

module.exports = router;
