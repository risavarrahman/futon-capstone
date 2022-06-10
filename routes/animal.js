const router = require('express').Router();
const Animal = require('../model/Animal');
const { tokenVerified } = require('./verifyToken');

// router.post('/lists', tokenVerified, async (req, res) => {
//   const animal = new Animal({
//     name: req.body.name,
//     status: req.body.status,
//     detail: req.body.detail,
//   });

//   try {
//     const savedAnimal = await animal.save();
//     res.status(200).send(savedAnimal);
//     res.send({ animal: animal._id });
//     Animal.insertMany([{ animal }]);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.get('/lists', tokenVerified, (req, res) => {
  const animal = res.json([
    { name: 'Burung Kasuari', status: 'Endangered', details: 'Burung Kasuari adalah burung yang terancam punah' },
    { name: 'Burung Merak', status: 'Endangered', details: 'Burung Merak adalah burung yang terancam punah' },
  ]);

  // res.send(animal.toString());
  // res.send(req.animal);
  // Animal.findById({ _id: req.animal });
});

module.exports = router;
