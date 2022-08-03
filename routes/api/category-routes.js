const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

///// FIND ALL CATEGORIES ///////////////
router.get('/', (req, res) => {
   Category.findAll({
    include: [Product]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  });
//////////FIND ALL CATEGORIES END///////////////

////////// FIND BY CATEGORY ID START //////////////////
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
});
///////// FIND BY CATEGORY ID END /////////

////////////// CREATE CATEGORY START //////////////////////
  router.post('/', async (req, res) => {
    // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });
///////////////////CREATE CATEGORY END ////////////

////////////////// CATEGORY POST STRART///////////
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
////// CATEGORY POST END //////////////////////////

////////// CATEGORY DELETE START /////////////////
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
  if (!categoryData) {
      res.status(404).json({ message: 'No category with this ID exists!'});
      return;
    }
res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
////////// CATEGORY DELETE END /////////////////

module.exports = router;
