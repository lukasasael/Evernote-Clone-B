const Tag = require('../models').Tag;
const Note = require('../models').Note;
const Category = require('../models').Category;
const newNote = require('../dados/newNote');
/*
const card = require('../views/notes/_card.ejs');
const form = require('../views/notes/_form.ejs');
const createview = require('../views/notes/create.ejs');
const editview = require('../views/notes/edit.ejs');
const indexview = require('../views/notes/index.ejs');
const showview = require('../views/notes/show.ejs');
*/

const syncTags = async (note, tag_id_list) => {

};

const index = async (req, res, next) => {
    res.redirect('/');
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

    const note = await Note.findByPk(id, {
        include: [
            {
                model: Category,
                as: 'category',
                include:[{
                    model: Note,
                    as: 'notes'
                }],
            },
            {
                model: Tag,
                as: 'tags'
            }
        ],
    });

    const categories = await Category.findAll();
    const tags = await Tag.findAll();
    
    res.status(200).json({note, categories, tags});
    //res.render('notes/show', {note, categories, tags});
};

const create = async (req, res) => {
    // const note = Note.build(newNote);

    const note = newNote;
    const categories = await Category.findAll();
    const tags = await Tag.findAll();

    // res.status(200).json({ note, categories, tags});
    res.render('notes/create', { note, categories, tags });
};

const store = async (req, res, next) => {
    const payload = {
        method: req.method,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
    };

    const note = await Note.create(req.body);
    //const note = undefined;

    if (note) {
        payload['resultado'] = note;
        res.status(200).json(payload);
        res.redirect('/show', {note});
        
        return;
    } else {
        res.status(500).json({msg: 'não salvou!'});
        return;
    }

    // res.status(200).json(payload);
};

const edit = async (req, res, next) => {
    const id = req.params.id;
    const note = await Note.findByPk(id, {
        include: [
            {
                model: Category,
                as: 'category'
            },
            {
                model: Tag,
                as: 'tags'
            }
        ],
    });

    const categories = await Category.findAll();
    const tags = await Tag.findAll();

    res.render('notes/edit', {note, categories, tags});
};

const update = async (req, res) => {

    const payload = {
        method: req.method,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
    };

    const id = req.params.id;
    const note = await Note.findByPk(id, {
        include: [
            {
                model: Category,
                as: 'category'
            },
            {
                model: Tag,
                as: 'tags'
            }
        ],
    });

    // const note = await Note.update(req.body);

    if (note) {
        //payload['resultado'] = note;
        //res.status(200).json(payload);
        await note.update(
            {
                title: req.body.title || note.title,
                body: req.body.body || note.body,
                category_id: req.body.category_id || note.category_id,
            }
        ); 
        
        await syncTags(note, req.body.tags);

        res.redirect(`/${id}`);
        return;
    } else {
        res.status(500).json({msg: 'não salvou!'});
        return;
    }


    // .then(user => {
    //     if (!user) {
    //       return res.status(404).send({
    //         message: 'User Not Found',
    //       });
    //     }
    //     return user
    //       .update({
    //         username: req.body.username || user.username,
    //         password: req.body.password || user.password,
    //       })
    //       .then(() => res.status(200).send(user))
    //       .catch((error) => res.status(400).send(error));
    //   })
    //   .catch((error) => res.status(400).send(error));
    // }
    
    //res.status(200).json({msg: 'Atualiza a nota pelo id na URL'});
};

const destroy = async (req, res) => {

};

module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy,
};