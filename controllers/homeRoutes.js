const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('landingPage', { 
      logged_in: req.session.logged_in 
    });
});

router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await User.findByPk(req.params.id, {
      include: [{ model: BlogPost }]
    });

    const data = blogPostData.get({ plain: true });
    const blogPosts = data.blogposts
    
    res.render('profile', {
      blogPosts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/homePage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const data = await BlogPost.findAll();
    const blogPosts = data.map(blogpost => blogpost.dataValues);

    const publicPosts = blogPosts.filter(blogpost => blogpost.public === true);

    console.log(publicPosts);
    res.render('homePage', {
      publicPosts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const data = await BlogPost.findAll();
    const blogPosts = data.map(blogpost => blogpost.dataValues);

    const publicPosts = blogPosts.filter(blogpost => blogpost.public === true);

    console.log(publicPosts);
    res.render('homePage', {
      publicPosts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect('/homePage');
    return;
  }

  res.render('landingPage');
});

router.get('*', async (req, res) => {
  res.render('landingPage', { 
    logged_in: req.session.logged_in 
  });
});

module.exports = router;
