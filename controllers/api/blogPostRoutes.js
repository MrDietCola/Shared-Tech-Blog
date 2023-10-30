const router = require('express').Router();
const { BlogPost } = require('../../models');

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one blog post
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Traveller, through: Trip, as: 'trips_by_traveller' }]
    });
    if (!locationData) {
      res.status(404).json({ message: 'No location with this id!' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a blog post
router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a blog post
router.put('/:id', async (req, res) => {
  try {
    const locationData = await Location.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!locationData[0]) {
      res.status(404).json({ message: 'No location with this id!' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a blog post
router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
