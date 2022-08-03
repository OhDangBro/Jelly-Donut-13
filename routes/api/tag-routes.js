const router = require('express').Router();
const { Tag, Product, Category } = require('../../models');

// The `/api/tags` endpoint
///////////////////FIND ALL TAGS START///////////////////
router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  });
////////////////////FIND ALL TAGS END///////////////////////

///////////////////////FIND TAG BY ID START//////////////
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
///////////////////////FIND TAG BY ID END//////////////



/////////////////////// PUT TAG START //////////////////////////
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
//////////////////// TAG UPDATE END ////////////////////////

///////////// TAG DELETE START /////////////////

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
			where: {
				id: req.params.id,
			},
		})
		.then((tagData) => {
			res.json(`Tag Removed!`);
		})
		.catch((err) => {
			res.json(err);
		});
});
//////////////// TAG DELETE END /////////////
module.exports = router;
