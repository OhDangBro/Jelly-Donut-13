const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
   Category.findAll({
    include: [Product]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  });


router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include:  [Product]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  // be sure to include its associated Category and Tag data
});
  // find one category by its `id` value
  // be sure to include its associated Product

router.post('/', (req, res) => {
  Category.create({
    category_name: req.params.id
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  {
  where: {
    id: req.params.id }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that ID.' });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json('No product foind with this current ID');
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


module.exports = router;
