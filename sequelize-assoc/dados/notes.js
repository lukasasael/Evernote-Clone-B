const notas = [
    {
        id: 1,
        title: 'Título 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis a metus in dignissim.',
        category_id: 1,
        tags: [1, 2],
        created_date: new Date('2022-05-05T11:00:00').toLocaleString("pt-BR"),
        created_at: '2022-01-20T11:00:00',
        updated_date: null,
        updated_at: '2022-01-25T11:09:58',
    },
    {
        id: 2,
        title: 'Título 2',
        body: 'Sed sed leo quis nibh iaculis sollicitudin. Cras eget aliquam massa, dictum suscipit nunc. Aenean commodo pellentesque aliquet.',
        category_id: 2,
        tags: [3],
        created_date: new Date().toLocaleString("pt-BR"),
        updated_date: null
    },
    {
        id: 3,
        title: 'Título 3',
        body: 'Phasellus nec urna vel enim vestibulum venenatis. Sed et elementum velit, non vestibulum lorem.',
        category_id: 3,
        tags: [2],
        created_date: new Date().toLocaleString("pt-BR"),
        updated_date: null
    },
    {
        id: 4,
        title: 'Título 4',
        body: 'Sed aliquet felis id nisl sodales, id sollicitudin diam ullamcorper.',
        category_id: 2,
        tags: [],
        created_date: new Date().toLocaleString("pt-BR"),
        updated_date: null
    }
];

module.exports = notas;