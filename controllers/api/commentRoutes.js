const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const blogPostData = await Comment.findAll();

    if (!blogPostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }
    console.log(blogPostData);
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
