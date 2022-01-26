const inquirer = require('inquirer');
require('colors');

const questions = [
{
    type: 'list',
    name: 'option',
    message: 'Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${"1".blue}. Buscar ciudad`,
        },
        {
            value: 2,
            name: `${"2".blue}. Historial`,
        },
        {
            value: 3,
            name: `${"3".blue}. Salir`,
        },
    ]
}
];
const enter = [
    {
        type: 'input',
        name: 'option',
        message: `Presione ${'Enter'.rainbow} para continuar`,
    }
    ]; 

const inquirerMenu = async()=> {

    let drop = " Weather API "
    console.clear();

    console.log(drop.cyan);
    console.log("\n".rainbow);

    const {option} = await inquirer.prompt(questions);
    return option;
}
const inquirerPausa = async()=>{
    console.log('\n');
    const {option} = await inquirer.prompt(enter);
    return option;
}
const readInput = async(message)=>{
    const question = [{
        type:'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length===0){
                return 'Ingrese un valor';
            }
            return true;
        }
    }];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async (lugares = []) =>{
const choices = lugares.map((lugar,i )=>{
    return {
        value: lugar.id,
        name: `${i+1}. ${lugar.nombre}` ,
    }
});
choices.unshift({value:'0',name: 'Cancelar'});

const preguntas = [{type:'list',name:'id',message:'Seleccione',choices}];
const {id} = await inquirer.prompt(preguntas);
return id;
}

const confirm = async (message) =>{
    const preguntas = [{type:'confirm',name:'ok',message}];
    const {ok} = await inquirer.prompt(preguntas);
    return ok;
}

const showChecklist = async (tareas = []) =>{
    const choices = tareas.map((tarea,i )=>{
        return {
            value: tarea.id,
            name: `${i+1} ${tarea.desc}` ,
            checked: (tarea.completadoEn)?true : false
        }
    });
    
    
    const preguntas = [
        {type:'checkbox',name:'ids',message:'Seleccione',choices}
    ];
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    showMenu: inquirerMenu,
    pause: inquirerPausa,
    readInput: readInput,
    listPlaces,
    confirm,
    showChecklist
}