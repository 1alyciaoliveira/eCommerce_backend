const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productRoutesData = await Product.findAll({
      include: [{ model: Category, Tag, ProductTag }], 
    });
    console.log(productRoutesData);
    res.status(200).json(productRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productRoutesData = await Product.findByPk(req.params.id, {
      include: [{ model: Category, Tag, ProductTag }],
    });
    if(!productRoutesData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const product = await Product.create(req.body);

      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagId) => {
          return {
            product_id: product.id,
            tag_id: tagId,
          };
        });
        await ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});


// update product
router.put('/:id', async (req, res) => {
  try {
    const updateProduct = await Product.update(req.body, {
      where: { id: req.params.id },
  });

  if (updateProduct[0] === 0) {
    return res.status(404).json({ message: 'No product found with this id!' });
  }
  res.status(200).json({ message: 'Product updated successfully' });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});
  

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productRoutesData = await Product.destroy({
      where: {
        id: req.params.id, 
      }
    });

    if(!productRoutesData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Product was deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
