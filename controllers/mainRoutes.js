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
    console.log(posts)
    
    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;