const router = require("express").Router();
const { User, Post, Comment } = require("./../models");
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData =  await Post.findAll({
      include: [
        { model: Comment, attributes: ["body", "post_id", "user_id"]},
      ],
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));
   
    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sign-Up Route:
router.get("/signUp", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/api/games/search");
    return;
  }
  try {
    res.render("signUp", {
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log-In Route:
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// Creating post:

router.post('/', async (req, res) => {
  console.log("=============================== Posting Post" );
  console.log(req.body.body);
  console.log(req.body.title);
  Post.create({
          body: req.body.body,
          post_header:  req.body.title,
          user_id: req.session.user_id,
  }
  )
  
      .then((newPost) => {

          // Send the newly created row as a JSON object
          console.log(newPost);
          readAndAppend(newPost, '../../seeds/postData.json');

          res.json(newPost);

      })
      
      .catch((err) => {
          res.json(err);
      });
  // render results

});

module.exports = router;
