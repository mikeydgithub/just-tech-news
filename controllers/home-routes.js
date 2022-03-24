const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: ['id','post_url','title','created_at',
    // sequalize.literal utility function, that allows you to directly insert arbitrary content into the query without any automic escaping
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
      res.render('homepage', { 
        posts,
        loggedIn: req.session.loggedIn 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// single-post template
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      // sequelize.literal utility function, that allows you to directly insert arbitrary content into the query without any automatic escaping.
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
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    // serialize the data
    const post = dbPostData.get({ plain: true });

    //pass data to the template
    // The res.render() function is used to render a view and sends the rendered HTML string to the client.
    res.render('single-post', { 
      post,
      loggedIn: req.session.loggedIn 
    });
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

// console log session vairables
router.get('/', (req, res) => {
  console.log(req.session);
  //other logic
})


module.exports = router;
