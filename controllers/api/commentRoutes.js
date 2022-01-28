const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Game, User } = require('../../models');
const { Op } = require("sequelize");



// Comment = new Comment(api, req.params.id)
router.post('/:post', async (req, res) => {
    // Use Sequelize's `create()` method to add a row to the table
    // Similar to `INSERT INTO` in plain SQL
    Comment.create({
        // ...req.body, game_id, user_id,
        
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
