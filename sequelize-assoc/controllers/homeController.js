const Tag = require('../models').Tag;
const Note = require('../models').Note;
const Category = require('../models').Category;

module.exports = {
    async index (req, res, next) {
        const notes = await Note.findAll({
            order: [
                ['id', 'ASC']
            ],
            include: [
                {
                    model: Category,
                    as: 'category',
                },
                {
                    model: Tag,
                    as: 'tags',
                }
            ]
        });
    
        const categories = await Category.findAll();
        const tags = await Tag.findAll();

        res.render('index', {notes, categories, tags});
    },

    notFound (req, res, next) {
        res.status(404).render('errors/404');
    },

    sobre (req, res, next) {
        res.status(200).json({msg: 'Home Sobre'});
    },
};