const router = require('express').Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require('../../models');
const { Op } = require("sequelize");

// get a specific post
router.get("/:id", async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {
          [Op.or]: [{ id: req.params.id }]
        },
        include: [

            { model: Comment, attributes: ["body", "post_id", "user_id"]},
            
          ],
      });
      
      req.session.save(() => {
        req.session.post_id = req.params.id;
        console.log(req.session.post_id);
      
      });
      
      res.render('post', {
        postData,
        logged_in: req.session.logged_in,
        
  
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



module.exports = router;