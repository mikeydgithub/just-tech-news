const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // need the entire array of posts to be in a template. That also means to serialize the entire array.
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      // the res.render() function is used to render a view and sends the rendered HTML string to the client
      console.log(dbPostData[0])
      // normal properities of render() include an id property and a title. now the only property it has access to is the posts array. handlebars.js has built in helpers that will allow for minimal logic and looping over an array.
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// render login handlebars
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
