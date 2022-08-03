const router = require('express').Router();
const { Tag, Product, Category } = require('../../models');

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
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  // be sure to include its associated Category and Tag data
});

/// TAG POST START ///
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model:Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'Did not find tag matching this ID.'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

//// TAG POST END ////

/// PUT TAG START ////
router.put('/:id', (req, res) => {
   Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
        include: [Tag]
      })
      .then(tagData => {
        if (!tagData) {
          res.status(404).json({ message: 'No Tag found by that ID' });
          return;
        }
        res.json(tagData);
      })
      .catch(err => {f
        console.log(err);
        res.status(500).json(err);
      });
  });
/// TAG END ////

///////////// TAG DELETE START /////////////////

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
			where: {
				id: req.params.id,
			},
		})
		.then((qtyRemoved) => {
			res.json(`${qtyRemoved} tag were removed from the database`);
		})
		.catch((err) => {
			res.json(err);
		});
});
//////////////// TAG DELETE END /////////////
module.exports = router;
