const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment,  User } = require('../../models');
const { Op } = require("sequelize");




router.post('/', async (req, res) => {
    console.log("===============================" );
    Comment.create({
       
            body: req.body.body,
            post_id:  req.session.post_id,
            user_id: req.session.user_id,
            username: req.session.username
        
    }
    )
    
        .then((newComment) => {
            // Send the newly created row as a JSON object
            console.log(newComment);
            readAndAppend(newComment, '../../seeds/commentData.json');

            res.json(newComment);

        })
        
        .catch((err) => {
            res.json(err);
        });
    // render results

});

module.exports = router;
