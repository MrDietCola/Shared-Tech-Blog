const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogPostData );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll();

    if (!blogPostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.update({
      title: req.body.title,
      description: req.body.description,
      public: req.body.public,
      author_id: req.body.author_id,
      date_created: req.body.date_created
    },
      {
        where: { id: req.body.postId }
      });

      console.log(req.body, req.params.id);

    res.status(200).json(updatedBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
