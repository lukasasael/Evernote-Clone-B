const Tag = require('../models').Tag;
const Category = require('../models').Category;
const Note = require('../models').Note;

const index = async (req, res, next) => {
    const tags = await Tag.findAll({
        order: [
            ['name', 'ASC']
        ],
        include: [
            {
                model: Note,
                as: 'notes',
            }
        ]
    });

    res.render('tags/index',{tags});
};

const show = async (req, res, next) => {
    const id = req.params.id;
    const checkNumber = true;
    // console.log('O param de entrada é ', id);

    if (checkNumber) {
        if (Number.isNaN(parseInt(req.params.id))) {
            res.status(400).json({msg: `O parâmetro de entrada informado foi ${id}, não é adequado`});
            return;
        }
    }

    // const note = await Note.findOne({ where: { title: String(id) } });
    const tag = await Tag.findByPk(id, {
        include: [
            {
                model: Note,
                as: 'notes'
            },
        ],
    });

    const categories = await Category.findAll();
    const tags = await Tag.findAll();
    
    res.render('tags/show', {tag, categories, tags});

    /*
    const note = await Note.findOne({ where: { title: 'My Title' } });
    if (note === null) {
        console.log('Not found!');
    } else {
        console.log(note instanceof Note); // true
        console.log(note.title); // 'My Title'
    }
    res.status(200).json({note});
    */
};

module.exports = {
    index,
    show,
};