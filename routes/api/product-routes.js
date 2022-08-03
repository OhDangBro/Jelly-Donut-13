const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

/////////////////// get all products START ////////////////
router.get('/', (req, res) => {
  Product.findAll({
    include: [Category, Tag]
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  // be sure to include its associated Category and Tag data
});

/////////////// GET ALL PRODUCTS END ///////////////////

////////////////// get one product START ///////////////////
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  }).then((data) =>{
    res.status(200);
  res.json(data);
  })
  // be sure to include its associated Category and Tag data
});

//////////// GET ONE PRODUCT END ////////////////////

/////////////// CREATE NEW PRODUCT START //////////////////
    router.post('/', (req, res) => {
     Product.create(req.body)
        .then((product) => {
         if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
              return {
                product_id: product.id,
                tag_id,
              };
            });
            return ProductTag.bulkCreate(productTagIdArr);
          }
          // if no product tags, err
          res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
    // Use this when running post in insomnia
    // {
    //   "product_name": "Basketball",
    //   "price": 200.00,
    //   "stock": 3,
    //   "tagIds": [1, 2, 3, 4]
    // }
// Use above when running post in insomnia //
/////////////////////// CREATE NEW PRODUCT END /////////////////

////////////////////// UPDATE PRODUCT START //////////////////////

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
	Tag.update({
			tag_name: req.body.tag_name,
		},{
			where: {
				id: req.params.id,
			},
		})
		.then((tag) => {
			res.json(tag);
		})
		.catch((err) => {
			res.json(err);
		});
});

///////////////////////// PRODUCT UPDATE END /////////////////////

///////////////////////// PRODUCT DELETE START ///////////////////

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(productData => {
    if (!productData) {
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

/// PRODUCT DELETE END ////////

module.exports = router;
