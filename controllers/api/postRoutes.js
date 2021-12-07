const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  try {

    const dbPostData = await Post.findByPk(req.params.id,{

    }); // i removed comments and user... mistake?

    const post = dbPostData.get({ plain: true });

    req.session.post_id = post.id;
    
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;