const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryRoutesData = await Category.findAll({
      include: [{ model: Product }], 
    });
    res.status(200).json(categoryRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryRoutesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], 
    });
    if(!categoryRoutesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name, 
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory =  await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateCategory === 0) {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'No category found with this id!' });
      }
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryRoutesData = await Category.destroy({
      where: {
        id: req.params.id, 
      }
    });

    if(!categoryRoutesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category was deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
