const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  });


router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [Category, Tag]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  // be sure to include its associated Category and Tag data
});

/// TAG POST START ///
router.post('/', (req, res) => {
 Tag.create({
  tag_name: req.body.tag_name
 })
 .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//// TAG POST END ////


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
