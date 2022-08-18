let listaA = [];
let listaB = [{id: '1', name: 'item 1'}, {id: '2', name: 'item 1'}];
let obj1 = {
    'id': '1',
    name: 'Sou um objeto separado',
};

const clientFunction = () => {
    console.log('Sou uma função que é executada no lado do cliente');
};

const sayHello = () => {
    const msg = "aqui vem a mensagem de boas vindas";
    const welcomeP = document.querySelector('#welcome-p');
    if (welcomeP) {
        welcomeP.innerHTML = msg;
    } else {
        console.log('Não e existe p#welcome');
    }
};

document.addEventListener("DOMContentLoaded", function(e) {
    sayHello();
});

