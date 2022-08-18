var express = require('express');
var router = express.Router();
const homeController = require('../controllers').homeController;
const noteController = require('../controllers').noteController;
const categoryController = require('../controllers').categoryController;
const tagController = require('../controllers').tagController;

router.use(function(req,res,next){
  res.locals.config = {
      language: req.headers["accept-language"].split(",")[0]
  };
  next();
});

/* Categories */
router.get('/categories', categoryController.index);
router.get('/categories/:id', categoryController.show);


/* Tags */
router.get('/tags', tagController.index);
router.get('/tags/:id', tagController.show);


/* Notes */
router.get('/notes', noteController.index);
router.get('/create', noteController.create);
router.post('/notes', noteController.store);
router.post('/notes/:id',noteController.update);
router.post('/notes/:id/delete',noteController.destroy);

router.get('/:id/edit', noteController.edit);
router.get('/:id',noteController.show);

// router.get('/:id/edit', function(req, res, next) {
//   const note = notes.find( ({ id }) => id == req.params.id);

//   if (typeof note==='undefined') {
//     res.status(404).json({ msg: 'Nota não encontrada' });
//   } else {
//     // res.status(200).json({ note });
//     res.render('notes/edit', { note, categories, tags, note_tag });
//   }

// });
// router.post('/notes/:id', function(req, res, next) {
//   const payload = {
//     msg: 'Acompanhamento',
//     method: req.method,
//     headers: req.headers,
//     body: req.body,
//   };
//   res.status(200).json(payload);
//   // res.redirect('/');
// });

/* GET home page. */
router.get('/', homeController.index);

module.exports = router;