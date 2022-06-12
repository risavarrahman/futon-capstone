const router = require('express').Router();
const Plant = require('../model/Plant');
const { tokenVerified } = require('./verifyToken');

router.post('/lists', tokenVerified, async (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
  });

  try {
    const savedPlant = await plant.save();
    res.send({ plant });
    // res.status(200).send(savedPlant);
    // Plant.insertMany({ plant });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/lists', tokenVerified, (req, res) => {
  Plant.find()
    .then((plant) => {
      res.status(200).json({ plant });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err,
      });
    });
});

module.exports = router;
