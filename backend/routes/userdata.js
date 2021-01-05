const router = require('express').Router();
let Data = require('../models/userdata.model');

router.route('/').get((req, res) => {
  Data.find()
    .then(Datas => res.json(Datas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const address = req.body.address;
  const phoneno = Number(req.body.phoneno);
  const birthday = Date.parse(req.body.birthday);
  const store = req.body.store;
  const notes = req.body.notes;

  const newData = new Data({
    username,
    address,
    phoneno,
    birthday,
    store,
    notes
  });
  console.log(newData)

  newData.save()
  .then(() => res.json('Data added!').then(console.log(newData)))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Data.findById(req.params.id)
    .then(Data => res.json(Data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Data.findByIdAndDelete(req.params.id)
    .then(() => res.json('Data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Data.findById(req.params.id)
    .then(Data => {
      console.log(req.body.store)
      Data.username = req.body.username;
      Data.address = req.body.address;
      Data.phoneno = Number(req.body.phoneno);
      Data.birthday = Date.parse(req.body.birthday);
      Data.store = req.body.store;
      Data.notes = req.body.notes;
      console.log(Data.store)

      Data.save()
        .then(() => res.json('Data updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;