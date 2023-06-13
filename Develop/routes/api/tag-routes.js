const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagRoutesData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }], 
    });
    res.status(200).json(tagRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagRoutesData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }], 
    });
    if(!tagRoutesData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
    try {
      const tagRoutesData = await Tag.create({
        tag_name: req.body.tag_name,
      });
      res.status(200).json(tagRoutesData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
    try {
      const tagRoutesData = await Tag.update(req.body, {
        where: { id: req.params.id },
        //add more things here
      });  
    } catch (err) {
      res.status(500).json(err);
    } 
});

router.delete('/:id', await (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagRoutesData = Tag.destroy({
      where: {
        id: req.params.id, 
      }
    });

    if(!tagRoutesData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
