const Category = require('../models').Category;
const Tag = require('../models').Tag;
const Note = require('../models').Note;

const index = async (req, res, next) => {
    /*
    for(let i=0; i<categories.length; i++) {
        categories[i]['notes'] = [];

        for(let j=0; j<notes.length; j++) {
        const note = notes[j];
        if (note.category_id == categories[i].id) {
            categories[i]['notes'].push(note);
        }
        }
    }
    */
    // res.status(200).json({ msg: 'Rota /tags', tags });
    const categories = await Category.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                model: Note,
                as: 'notes',
            }
        ]
    });
    
    res.render('categories/index', { categories });
    //res.status(200).json(categories);
}

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
    const category = await Category.findByPk(id, {
        include: [
            {
                model: Note,
                as: 'notes'
            },
        ],
    });
    
    const categories = await Category.findAll();
    const tags = await Tag.findAll();

    res.render('categories/show', {category, categories, tags});
    //res.status(200).json({category, categories, tags});

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